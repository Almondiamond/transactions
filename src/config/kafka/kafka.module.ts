import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaOptionsFactory } from 'src/config/kafka/kafka.config';
import { KAFKA_CLIENT } from 'src/config/kafka/kafka.constant';
import { KafkaService } from 'src/config/kafka/kafka.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        inject: [],
        useFactory: () => kafkaOptionsFactory(),
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
