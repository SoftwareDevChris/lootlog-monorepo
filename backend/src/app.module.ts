import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";

import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ArticlesModule } from "./articles/articles.module";
import { ImagesModule } from "./images/images.module";

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "postgres",
          host: "db",
          port: parseInt(process.env.POSTGRES_PORT) || 20,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB_NAME,
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: true,
          logging: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ArticlesModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
