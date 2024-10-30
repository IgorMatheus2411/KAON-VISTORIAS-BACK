import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // Importando express corretamente

const expressApp = express();

async function bootstrap() {
  // Crie o aplicativo NestJS usando o adaptador do Express
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Inicialize o aplicativo
  await app.init();
}

// Inicializa o aplicativo
bootstrap();

export const handler = expressApp; // Exportando a instância express
