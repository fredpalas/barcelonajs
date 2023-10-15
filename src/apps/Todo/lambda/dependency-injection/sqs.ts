import { NodemailerConfigFactory } from '@/Contexts/Shared/infrastructure/Email/NodemailerConfigFactory';
import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { NodemailerFactory } from '@/Contexts/Shared/infrastructure/Email/NodemailerFactory';
import { Nodemailer } from '@/Contexts/Shared/infrastructure/Email/Nodemailer';
import { ListCreatedSubscriber } from "@/Contexts/Todo/List/application/Subscribers/ListCreatedSubscriber";

export function register(container: ContainerBuilder) {
  container.register('Shared.mailer.factory').setFactory(NodemailerConfigFactory, 'createConfig');
  container
    .register('Shared.nodemailer')
    .addArgument(new Reference('Shared.mailer.factory'))
    .setFactory(NodemailerFactory, 'create');
  container.register('Shared.mailer', Nodemailer).addArgument(new Reference('Shared.nodemailer'));
  container
    .register('Todo.list.application.ListCreatedSubscriber', ListCreatedSubscriber)
    .addArgument(new Reference('Shared.mailer'))
    .addTag('domainEventSubscriber')
}
