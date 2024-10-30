import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa CORS se for necessário (para chamadas de outras origens)
  app.enableCors();

  // Define a porta para o Render
  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
