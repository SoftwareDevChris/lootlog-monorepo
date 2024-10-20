import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { ArticleImage } from "src/entities/articleImage.entity";

export class CreateArticleImageDto extends ArticleImage {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name must not be empty" })
  name: string;

  @IsString({ message: "Image type must be a string" })
  @IsNotEmpty({ message: "Image type must not be empty" })
  type: string;

  @IsNumber()
  @IsNotEmpty({ message: "Image size must not be empty" })
  size: number;

  @IsString({ message: "Base64 must be a string" })
  @IsNotEmpty({ message: "Base64 must not be empty" })
  base64: string;

  @IsString({ message: "Last modified must be a string" })
  @IsNotEmpty({ message: "Last modified must not be empty" })
  lastModified: string;
}
