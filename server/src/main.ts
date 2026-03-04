import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS : l’origine doit correspondre exactement à celle envoyée par le navigateur (sans slash final).
  const rawOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  const origin = rawOrigin.replace(/\/+$/, '');
  app.enableCors({ origin, credentials: true });
  app.use(cookieParser());
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 3001;
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/', (_req: express.Request, res: express.Response) => {
    res.json({ ok: true, message: 'Carin Siwa API' });
  });
  await app.listen(port, '0.0.0.0');
  console.log(`Server running at http://0.0.0.0:${port}`);
}
bootstrap();
