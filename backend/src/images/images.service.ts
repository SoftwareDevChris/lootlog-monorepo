import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "firebaseConfig";
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

  async uploadImageToFirebase(image: CreateArticleImageDto): Promise<string> {
    try {
      const storageRef = ref(storage, `images/${image.name}`);

      await uploadString(storageRef, image.base64, "data_url");

      const downloadUrl = await getDownloadURL(
        ref(storage, `images/${image.name}`),
      );

      return downloadUrl;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Error uploading image");
    }
  }

  async createImage(image: CreateArticleImageDto): Promise<ArticleImage> {
    try {
      const downloadUrl = await this.uploadImageToFirebase(image);

      const imageObject: Partial<ArticleImage> = {
        name: image.name,
        size: image.size,
        type: image.type,
        url: downloadUrl,
      };

      const createdImage = this.articleImageRepo.create(imageObject);
      return await this.articleImageRepo.save(createdImage);
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Error uploading image");
    }
  }
}
