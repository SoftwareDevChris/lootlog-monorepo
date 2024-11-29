import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { json } from "express";

import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

import { AppModule } from "./app.module";

const session = require("cookie-session");

const corsOptions: CorsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.FRONTEND_SERVER_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.enableCors(corsOptions);
  app.use(json({ limit: "10mb" }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    session({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }),
  );

  await app.listen(3456);
}
bootstrap();
