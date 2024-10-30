import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express'; // Certifique-se de que express está importado corretamente

const expressApp = express();

async function bootstrap() {
  // Crie o aplicativo NestJS usando o adaptador do Express
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Inicialize o aplicativo
  await app.init();

  // Opcional: Se quiser, adicione middlewares ou outras configurações aqui
}

// Chame a função de inicialização
bootstrap();

// Exporta o manipulador para o Vercel
export const handler = (req, res) => {
  expressApp(req, res);
};
