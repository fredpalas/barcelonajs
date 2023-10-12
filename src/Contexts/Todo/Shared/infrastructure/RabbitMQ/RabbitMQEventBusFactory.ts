import { DomainEventFailoverPublisher } from '../../../../Shared/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { RabbitMQConfig } from './RabbitMQConfigFactory';
import {RabbitMQqueueFormatter} from '../../../../Shared/infrastructure/EventBus/RabbitMq/RabbitMQqueueFormatter';
import {RabbitMQEventBus} from '../../../../Shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus';
import {RabbitMqConnection} from '../../../../Shared/infrastructure/EventBus/RabbitMq/RabbitMqConnection';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries
    });
  }
}
