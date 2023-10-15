import { APIGatewayProxyResultV2, SNSMessage, SQSEvent, SQSRecord } from "aws-lambda";
import container from "@/apps/Todo/lambda/dependency-injection";
import { DomainEventSubscribers } from "@/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";
import { SqsConsumer } from "@/Contexts/Shared/infrastructure/EventBus/SqsSns/SqsConsumer";
import { DomainEventDeserializer } from "@/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer";
import {register} from "@/apps/Todo/lambda/dependency-injection/sqs";
export async function main(event: SQSEvent): Promise<APIGatewayProxyResultV2> {
  register(container);
  const subscribers = DomainEventSubscribers.from(container);
  const deserializer = DomainEventDeserializer.configure(subscribers);
  const logger = container.get('Shared.Logger');
  const consumer = new SqsConsumer({ subscribers, deserializer, logger });
  const records= event.Records.map((record: SQSRecord) => {
      logger.info(`Processing message ${record.messageId}`);
      const message: SNSMessage = JSON.parse(record.body);
      return consumer.consume({
        body: message.Message,
        messageId: record.messageId
      });
  });

  await Promise.all(records);

  return {
    body: JSON.stringify({ records }),
    statusCode: 2000
  };
}
