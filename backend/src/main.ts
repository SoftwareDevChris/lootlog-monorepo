import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { json } from "express";

const session = require("cookie-session");

const corsOptions: CorsOptions = {
  origin: [process.env.FRONTEND_IPV4_URL, process.env.FRONTEND_IPV6_URL],
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.enableCors(corsOptions);
  app.use(json({ limit: "10mb" }));

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
