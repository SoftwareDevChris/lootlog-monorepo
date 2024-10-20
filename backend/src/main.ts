import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as session from "express-session";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const corsOptions: CorsOptions = {
  origin: ["http://localhost:80", "http://frontend"],
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors(corsOptions);

  app.use(
    session({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      },
    }),
  );

  await app.listen(3456);
}
bootstrap();
