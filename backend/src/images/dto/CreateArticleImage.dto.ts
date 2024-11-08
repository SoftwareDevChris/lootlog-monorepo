import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { ArticleImage } from "src/entities/articleImage.entity";

export class CreateArticleImageDto extends ArticleImage {
  @IsString({ message: "Fieldname must be a string" })
  @IsNotEmpty({ message: "Fieldname must not be empty" })
  fieldname: string;

  @IsString({ message: "Originalname type must be a string" })
  @IsNotEmpty({ message: "Originalname must not be empty" })
  originalname: string;

  @IsString({ message: "Encoding must be a string" })
  @IsNotEmpty({ message: "Encoding must not be empty" })
  encoding: string;

  @IsString({ message: "Mimetype must be a string" })
  @IsNotEmpty({ message: "Mimetype must not be empty" })
  mimetype: string;

  @IsNumber()
  @IsNotEmpty({ message: "Image size must not be empty" })
  size: number;

  @IsString({ message: "Base64 must be a string" })
  @IsNotEmpty({ message: "Base64 must not be empty" })
  buffer: Buffer;
}
