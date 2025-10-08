import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });
  app.enableCors();
  await app
    .listen(process.env.PORT || 3000)
    .then(() => console.log(`RUNNING ON PORT: ${process.env.PORT}`));
}

bootstrap();
