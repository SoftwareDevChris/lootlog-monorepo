import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ArticlesModule } from "./articles/articles.module";

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
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
