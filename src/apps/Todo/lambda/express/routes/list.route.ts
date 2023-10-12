import { Express } from 'express';
import { ListPutController } from "../../../backend/controllers/ListPutController";
import { ListsGetController } from "../../../backend/controllers/ListsGetController";
import container from '../../dependency-injection';

export const register = (app: Express) => {
  const coursesPostController: ListPutController = container.get(
    'Apps.Todo.Backend.controllers.ListPutController'
  );
  const listsGetController: ListsGetController = container.get(
    'Apps.Todo.Backend.controllers.ListsGetController'
  )
  // const coursesGetController: CoursesPostController = container.get(
  //   'Apps.Todo.Backend.controllers.CoursesGetController'
  // );

  app.put('/lists', coursesPostController.run.bind(coursesPostController));
  app.get('/lists', listsGetController.run.bind(listsGetController));
};
