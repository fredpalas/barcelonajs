import { ContainerBuilder, Reference } from "node-dependency-injection";
import { TypeOrmConfigFactory as ToCFpg } from '@/Contexts/Todo/Shared/infrastructure/persistence/postgre/TypeOrmConfigFactory';
import { TypeOrmClientFactory } from "@/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { InMemoryCommandBus } from "@/Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus";
import { CommandHandlers } from "@/Contexts/Shared/infrastructure/CommandBus/CommandHandlers";
import { QueryHandlers } from "@/Contexts/Shared/infrastructure/QueryBus/QueryHandlers";
import { InMemoryQueryBus } from "@/Contexts/Shared/infrastructure/QueryBus/InMemoryQueryBus";
import { TypeOrmListRepository } from "@/Contexts/Todo/List/infrastructure/persistence/TypeOrmListRepository";
import { ListCreator } from "@/Contexts/Todo/List/application/Create/ListCreator";
import { CreateListCommandHandler } from "@/Contexts/Todo/List/application/Create/CreateListCommandHandler";
import { ListsFinder } from "@/Contexts/Todo/List/application/Find/ListsFinder";
import { ListsQueryHandler } from "@/Contexts/Todo/List/application/Find/ListsQueryHandler";
import WinstonLogger from "@/Contexts/Shared/infrastructure/WinstonLogger";
import { SNSClient } from "@aws-sdk/client-sns";
import { SnsEventBus } from "@/Contexts/Shared/infrastructure/EventBus/SqsSns/SnsEventBus";
import { ListFinder } from "@/Contexts/Todo/List/application/Find/ListFinder";
import { ListQueryHandler } from "@/Contexts/Todo/List/application/Find/ListQueryHandler";
import { ListUpdateCommandHandler } from "@/Contexts/Todo/List/application/Update/ListUpdateCommandHandler";
import { ListUpdater } from "@/Contexts/Todo/List/application/Update/ListUpdater";
import { ListDeleter } from "@/Contexts/Todo/List/application/Delete/ListDeleter";
import { ListDeleteCommandHandler } from "@/Contexts/Todo/List/application/Delete/ListDeleteCommandHandler";

let container = new ContainerBuilder();
container.register('Shared.Logger', WinstonLogger)
  .addArgument([]);
container.register('Todo.Shared.TypeOrmConfig')
  .setFactory(ToCFpg, 'createConfig');

container
  .register('Todo.Shared.TypeOrmConnection')
  .addArgument('todo')
  .addArgument(new Reference('Todo.Shared.TypeOrmConfig'))
  .setFactory(TypeOrmClientFactory, 'createClient');

container
  .register('Todo.List.domain.ListRepository', TypeOrmListRepository)
  .addArgument(new Reference('Todo.Shared.TypeOrmConnection'));
container
  .register('Todo.List.application.ListCreator', ListCreator)
  .addArgument(new Reference('Todo.List.domain.ListRepository'))
  .addArgument(new Reference('Todo.Shared.domain.EventBus'));
container
  .register('Todo.List.application.ListUpdater', ListUpdater)
  .addArgument(new Reference('Todo.List.domain.ListRepository'))
  .addArgument(new Reference('Todo.List.application.ListFinder'));
container
  .register('Todo.List.application.ListDeleter', ListDeleter)
  .addArgument(new Reference('Todo.List.domain.ListRepository'));
container
  .register('Todo.list.CreateListCommandHandler', CreateListCommandHandler)
  .addArgument(new Reference('Todo.List.application.ListCreator'))
  .addTag('commandHandler');
container
  .register('Todo.list.ListUpdateCommandHandler', ListUpdateCommandHandler)
  .addArgument(new Reference('Todo.List.application.ListUpdater'))
  .addTag('commandHandler');
container
  .register('Todo.list.ListDeleteCommandHandler', ListDeleteCommandHandler)
  .addArgument(new Reference('Todo.List.application.ListDeleter'))
  .addTag('commandHandler');
container
  .register('Todo.List.application.ListsFinder', ListsFinder)
  .addArgument(new Reference('Todo.List.domain.ListRepository'));
container
  .register('Todo.list.FindListsQueryHandler', ListsQueryHandler)
  .addArgument(new Reference('Todo.List.application.ListsFinder'))
  .addTag('queryHandler');
container
  .register('Todo.List.application.ListFinder', ListFinder)
  .addArgument(new Reference('Todo.List.domain.ListRepository'));
container
  .register('Todo.list.application.ListQueryHandler', ListQueryHandler)
  .addArgument(new Reference('Todo.List.application.ListFinder'))
  .addTag('queryHandler');

container
  .register('Shared.EventBus.SNSClient', SNSClient);

container
  .register('Todo.Shared.domain.EventBus', SnsEventBus)
  .addArgument(new Reference('Shared.EventBus.SNSClient'))
  .addArgument(process.env.TOPIC_ARN);

let commandHandlers = [];
let taggedServices = container.findTaggedServiceIds('commandHandler');
for (let [id, definition] of taggedServices) {
  commandHandlers.push(container.get(id));
}
container
  .register('Todo.Shared.CommandHandler', CommandHandlers)
  .addArgument(commandHandlers);
container
  .register('Todo.Shared.domain.CommandBus', InMemoryCommandBus)
  .addArgument(new Reference('Todo.Shared.CommandHandler'));
let queryHandlers = [];
taggedServices = container.findTaggedServiceIds('queryHandler');
for (let [id, definition] of taggedServices) {
  queryHandlers.push(container.get(id));
}
container
  .register('Todo.Shared.QueryHandlers', QueryHandlers)
  .addArgument(queryHandlers);
container
  .register('Todo.Shared.domain.QueryBus', InMemoryQueryBus)
  .addArgument(new Reference('Todo.Shared.QueryHandlers'));
export default container;
