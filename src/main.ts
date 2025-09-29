import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import admin from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app
    .listen(process.env.PORT || 3000)
    .then(() => console.log(`RUNNING ON PORT: ${process.env.PORT}`));
}

bootstrap();
