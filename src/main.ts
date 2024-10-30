import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

async function bootstrap() {
  // Crie o aplicativo NestJS usando o adaptador do Express
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Inicialize o aplicativo
  await app.init();

  // Retorne a instância express
  return expressApp;
}

// Inicializa o aplicativo
const appPromise = bootstrap();

// Exporta o manipulador para o Vercel
export const handler = async (req, res) => {
  const app = await appPromise; // Aguarda a inicialização do aplicativo
  app(req, res); // Chama o aplicativo NestJS
};
