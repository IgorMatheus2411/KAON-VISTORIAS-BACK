import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Cria uma aplicação Express
const expressApp = express();

// Define uma rota padrão do Express
expressApp.get('/', (req, res) => {
  res.send('Hello World!'); // Rota simples para verificar se o servidor está funcionando
});

// Função para inicializar a aplicação NestJS
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

  return expressApp; // Retorna o manipulador express
}

// Exporte o manipulador para o Vercel
export const handler = async (req, res) => {
  const app = await bootstrap(); // Inicializa o Nest
  return app(req, res); // Passa as requisições e respostas para o express
};

// Inicia o servidor localmente se não estiver no ambiente Vercel
const port = process.env.PORT || 3000;
if (process.env.VERCEL_ENV !== 'production') {
  expressApp.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
