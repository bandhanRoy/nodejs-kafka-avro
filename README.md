# nodejs-kafka-avro

A simple kafka project in node js that will use avro schema registry

Debug the messages inside the container

```sh
docker-compose exec kafka sh
cd /usr/bin
./kafka-console-consumer --topic test-topic --bootstrap-server localhost:9092 --from-beginning
```
