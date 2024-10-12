import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString({ message: "Invalid title" })
  title: string;

  @IsString({ message: "Invalid subtitle" })
  subtitle: string;

  @IsNumber()
  categoryId: number;

  @IsObject({ message: "Invalid image" })
  image: File;

  @IsString({ message: "Invalid article body" })
  body: string;
}
