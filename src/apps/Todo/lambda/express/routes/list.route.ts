import { Express } from 'express';
import { ListsPutController } from "../../../backend/controllers/ListsPutController";
import { ListsGetController } from "../../../backend/controllers/ListsGetController";
import container from '../../dependency-injection';
import { ListPutController } from "@/apps/Todo/backend/controllers/ListPutController";
import { ListDeleteController } from "@/apps/Todo/backend/controllers/ListDeleteController";

export const register = (app: Express) => {
  const listsPutController: ListsPutController = container.get(
    'Apps.Todo.Backend.controllers.ListsPutController'
  );
  const listsGetController: ListsGetController = container.get(
    'Apps.Todo.Backend.controllers.ListsGetController'
  );
  const listGetController: ListsGetController = container.get(
    'Apps.Todo.Backend.controllers.ListGetController'
  );
  const listPutController: ListPutController = container.get(
    'Apps.Todo.Backend.controllers.ListPutController'
  );
  const listDeleteController: ListDeleteController = container.get(
    'Apps.Todo.Backend.controllers.ListDeleteController'
  );

  app.put('/lists', listsPutController.run.bind(listsPutController));
  app.get('/lists', listsGetController.run.bind(listsGetController));
  app.get('/lists/:id', listGetController.run.bind(listGetController));
  app.put('/lists/:id', listPutController.run.bind(listPutController));
  app.delete('/lists/:id', listDeleteController.run.bind(listDeleteController));
};
