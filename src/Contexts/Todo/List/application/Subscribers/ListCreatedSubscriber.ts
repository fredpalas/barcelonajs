import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber';
import { ListCreatedDomainEvent } from '@/Contexts/Todo/List/domain/ListCreatedDomainEvent';
import { DomainEventClass } from '@/Contexts/Shared/domain/DomainEvent';
import { Nodemailer } from '@/Contexts/Shared/infrastructure/Email/Nodemailer';

export class ListCreatedSubscriber implements DomainEventSubscriber<ListCreatedDomainEvent> {
  constructor(private mailer: Nodemailer) {}

  async on(domainEvent: ListCreatedDomainEvent): Promise<void> {
    console.log(domainEvent);
    await this.mailer.run({
      from: 'example@gmail.com',
      to: 'fredpalas@gmail.com',
      subject: `List created ${domainEvent.getTitle()}`,
      text: `List created ${domainEvent.getTitle()}`,
      html: `<b>List created ${domainEvent.getTitle()}</b>`
    });
  }

  subscribedTo(): Array<DomainEventClass> {
    return [ListCreatedDomainEvent];
  }
}
