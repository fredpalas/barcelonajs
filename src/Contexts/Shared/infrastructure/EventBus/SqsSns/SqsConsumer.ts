import { DomainEventDeserializer } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent';
import Logger from '@/Contexts/Shared/domain/Logger';
import { DomainEventSubscribers } from "@/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";

export interface SqsMessage {
  body?: string;
  messageId: string;
}

export class SqsConsumer {
  private deserializer: DomainEventDeserializer;
  private subscribers: DomainEventSubscribers;
  private logger: Logger;

  constructor(params: {
    subscribers: DomainEventSubscribers;
    deserializer: DomainEventDeserializer;
    logger: Logger;
  }) {
    this.subscribers = params.subscribers;
    this.deserializer = params.deserializer;
    this.logger = params.logger;
  }

  public async consume(message: SqsMessage) {
    if (!message.body) {
      throw new Error('Message body is empty');
    }

    const domainEvent = this.deserializer.deserialize(message.body.toString());
    const calls = this.subscribers
      .getSubscribersFor(domainEvent)
      .map(subscriber => this.call(domainEvent, message, subscriber));

    await Promise.all(calls);
  }

  private async call(domainEvent: DomainEvent, message: SqsMessage, subscriber: DomainEventSubscriber<DomainEvent>) {
    try {
      await subscriber.on(domainEvent);
    } catch (error) {
      await this.handleError(message);
      throw error;
    }
  }

  private async handleError(message: SqsMessage) {
    this.logger.error(`Error processing message ${message.messageId}: ${message.body}`);
  }
}
