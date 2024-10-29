import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // Porta dinâmica
  await app.listen(port);
  app.enableCors(); // Habilita CORS para todas as origens
}

bootstrap();
