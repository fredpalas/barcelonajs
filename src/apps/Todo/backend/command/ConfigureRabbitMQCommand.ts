import {DomainEventSubscribers} from '../../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import {RabbitMQConfigurer} from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConfigurer';
import {RabbitMqConnection} from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqConnection';
import {
  RabbitMQqueueFormatter
} from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQqueueFormatter';
import container from '../dependency-injection';
import {RabbitMQConfig} from "../../../../Contexts/Todo/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory";

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('Todo.Shared.RabbitMQConnection');
    const nameFormatter = container.get<RabbitMQqueueFormatter>('Todo.Shared.RabbitMQQueueFormatter');
    const {exchangeSettings, retryTtl} = container.get<RabbitMQConfig>('Todo.Shared.RabbitMQConfig');

    await connection.connect();

    const configurer = new RabbitMQConfigurer(connection, nameFormatter, retryTtl);
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({exchange: exchangeSettings.name, subscribers});
    await connection.close();
  }
}
