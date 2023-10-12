import {DomainEvent} from '../../../Shared/domain/DomainEvent';

export class ListCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'list.created';
  private title: string;
  private description: string;
  private type: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    aggregateId,
    title,
    description,
    type,
    createdAt,
    updatedAt,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    description: string;
    occurredOn?: Date;
    title: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super({eventName: ListCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.title = title;
    this.description = description;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toPrimitives(): any {
    const {title, description, type, createdAt, updatedAt} = this;
    return {
      title,
      description,
      type,
      createdAt,
      updatedAt,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: any;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const {aggregateId, attributes, occurredOn, eventId} = params;
    return new ListCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      description: attributes.description,
      type: attributes.type,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
      eventId,
      occurredOn,
    });
  }
}