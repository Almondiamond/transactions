import { Inject, Injectable } from '@nestjs/common';
import { KAFKA_CLIENT } from 'src/config/kafka/kafka.constant';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { KafkaEvent } from 'src/config/kafka/kafka.types';

@Injectable()
export class KafkaService {
  constructor(@Inject(KAFKA_CLIENT) private kafkaClient: ClientKafka) {}

  subscribeToResponseOf(pattern: string) {
    return this.kafkaClient.subscribeToResponseOf(pattern);
  }

  connect() {
    return this.kafkaClient.connect();
  }

  async send<Data, Result>(event: KafkaEvent<Data>) {
    const req = this.kafkaClient.send<Result>(
      event.eventName,
      event.toString(),
    );
    const data = await firstValueFrom(req);

    return data;
  }

  async produce(event: KafkaEvent<any>) {
    const request = this.kafkaClient.emit(event.eventName, event.data);
    await lastValueFrom(request);
  }
}
