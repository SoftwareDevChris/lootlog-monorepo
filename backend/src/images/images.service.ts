import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { firebaseAdmin } from "firebase";
import { ArticleImage } from "src/entities/articleImage.entity";
import { Repository } from "typeorm";
import { CreateArticleImageDto } from "./dto/CreateArticleImage.dto";

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ArticleImage)
    private articleImageRepo: Repository<ArticleImage>,
  ) {}

  async getAllImages() {
    return await this.articleImageRepo.find();
  }

  async getImageById(id: number) {
    return await this.articleImageRepo.findOne({ where: { id } });
  }

  async uploadImageToFirebase(
    image: Express.MulterFile,
  ): Promise<{ url: string; name: string }> {
    try {
      const sanitizedFilename = image.originalname.replace(
        /[^a-zA-Z0-9.\-_]/g,
        "",
      );
      const uniqueFilename = `${sanitizedFilename}-${Date.now()}`;
      const bucket = firebaseAdmin.storage().bucket();

      const imageFile = bucket.file(`images/${uniqueFilename}`);
      await imageFile.save(image.buffer, {
        metadata: {
          contentType: image.mimetype,
        },
        public: true,
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/images/${uniqueFilename}`;
      return {
        url: publicUrl,
        name: uniqueFilename,
      };
    } catch (err) {
      console.error("Error uploading image to Firebase:", err);
      throw err;
    }
  }

  async deleteImage(imageName: string) {
    const bucket = firebaseAdmin.storage().bucket();
    const file = bucket.file(`images/${imageName}`);

    return await file.delete();
  }

  async createImage(image: Express.MulterFile): Promise<ArticleImage> {
    try {
      const firebaseImage = await this.uploadImageToFirebase(image);

      const imageObject: Partial<ArticleImage> = {
        name: firebaseImage.name,
        size: image.size,
        type: image.mimetype,
        url: firebaseImage.url,
      };

      const createdImage = this.articleImageRepo.create(imageObject);
      return await this.articleImageRepo.save(createdImage);
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Error uploading image");
    }
  }
}
