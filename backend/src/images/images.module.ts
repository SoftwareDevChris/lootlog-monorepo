import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleImage } from "src/entities/articleImage.entity";
import { ArticlesService } from "src/articles/articles.service";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleImage])],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
