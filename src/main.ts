import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Inicializa a aplicação Nest
  await app.init();

  // Define a rota padrão para o Express
  expressApp.get('/(.*)', (req, res) =>
    app.getHttpAdapter().getInstance().handle(req, res),
  );

  // Inicia o servidor na porta 3000 apenas em ambiente local
  const port = process.env.PORT || 3000; // Use a porta do ambiente ou 3000
  if (process.env.VERCEL_ENV !== 'production') {
    expressApp.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  }
}

// Exporte o manipulador para o Vercel
export const handler = expressApp;

// Chame a função bootstrap
bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
});
