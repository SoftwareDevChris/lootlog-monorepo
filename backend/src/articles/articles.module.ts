import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticlesService, JwtAuthGuard],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
