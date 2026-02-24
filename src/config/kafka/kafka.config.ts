import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaOptionsFactory = (): KafkaOptions => {
  const kafkaOptions: KafkaOptions['options'] = {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: (process.env.KAFKA_CLIENT_BROKERS ?? '').split(','),
    },
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID ?? '',
    },
    subscribe: {
      fromBeginning: true,
    },
  };

  return { transport: Transport.KAFKA, options: kafkaOptions };
};
