import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: [
      'http://api.alex.nomoredomainsmonster.ru',
      'https://api.alex.nomoredomainsmonster.ru',
    ],
  });
  await app.listen(3000);
}
bootstrap();
