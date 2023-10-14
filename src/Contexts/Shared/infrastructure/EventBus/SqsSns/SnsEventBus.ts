import { EventBus } from '@/Contexts/Shared/domain/EventBus';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"
import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscribers } from "@/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";
import { DomainEventJsonSerializer } from "@/Contexts/Shared/infrastructure/EventBus/DomainEventJsonSerializer";

export class SnsEventBus implements EventBus {
  constructor(private snsClient: SNSClient, private targetArn: string) {}

  addSubscribers(subscribers: DomainEventSubscribers): void {
  }

  async publish(events: DomainEvent[]): Promise<void> {
    const topics = events.map(event =>
      this.snsClient.send(new PublishCommand({
        Message: DomainEventJsonSerializer.serialize(event),
        TargetArn: this.targetArn
      })
    ));

    await Promise.all(topics);
  }
}
