import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  console.log(process.env.MONGO_URI)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
