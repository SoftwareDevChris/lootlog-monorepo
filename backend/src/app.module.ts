import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";

import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ArticlesModule } from "./articles/articles.module";

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "sqlite",
          database: process.env.DB_NAME,
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
