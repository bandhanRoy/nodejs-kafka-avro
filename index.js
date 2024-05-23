const { Kafka, Partitioners } = require('kafkajs');
const {
  SchemaRegistry,
  SchemaType,
} = require('@kafkajs/confluent-schema-registry');

const main = async () => {
  const registry = new SchemaRegistry({ host: 'http://localhost:8081/' });
  const schema = {
    type: 'record',
    namespace: 'test',
    name: 'Pet',
    fields: [
      {
        name: 'kind',
        type: { type: 'enum', name: 'PetKind', symbols: ['CAT', 'DOG'] },
      },
      { name: 'name', type: 'string' },
    ],
  };

  const { id } = await registry.register({
    schema: JSON.stringify(schema),
    type: SchemaType.AVRO,
  });

  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  const payload = { kind: 'DOG', name: 'Albert' };

  const buf = await registry.encode(id, payload);

  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: buf }],
  });

  await producer.disconnect();

  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const decodedValue = await registry.decode(message.value);
      console.log({ decodedValue });
    },
  });
};

main();
