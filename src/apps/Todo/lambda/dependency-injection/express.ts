import { ContainerBuilder, Reference } from "node-dependency-injection";
import { ListsPutController } from "@/apps/Todo/backend/controllers/ListsPutController";
import { ListsGetController } from "@/apps/Todo/backend/controllers/ListsGetController";
import { ListGetController } from "@/apps/Todo/backend/controllers/ListGetController";
import { ListPutController } from "@/apps/Todo/backend/controllers/ListPutController";
import { ListDeleteController } from "@/apps/Todo/backend/controllers/ListDeleteController";

export function register(container: ContainerBuilder) {
  container
    .register('Apps.Todo.Backend.controllers.ListsPutController', ListsPutController)
    .addArgument(new Reference('Todo.Shared.domain.CommandBus'));
  container
    .register('Apps.Todo.Backend.controllers.ListsGetController', ListsGetController)
    .addArgument(new Reference('Todo.Shared.domain.QueryBus'));
  container
    .register('Apps.Todo.Backend.controllers.ListGetController', ListGetController)
    .addArgument(new Reference('Todo.Shared.domain.QueryBus'));
  container
    .register('Apps.Todo.Backend.controllers.ListPutController', ListPutController)
    .addArgument(new Reference('Todo.Shared.domain.CommandBus'));
  container
    .register('Apps.Todo.Backend.controllers.ListDeleteController', ListDeleteController)
    .addArgument(new Reference('Todo.Shared.domain.CommandBus'));
}