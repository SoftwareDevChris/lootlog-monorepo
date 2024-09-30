import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { Article } from "src/entities/article.entity";
import { User } from "src/entities/user.entity";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  repeatedPassword: string;
}
