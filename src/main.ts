import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaOptionsFactory } from 'src/config/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(kafkaOptionsFactory());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
