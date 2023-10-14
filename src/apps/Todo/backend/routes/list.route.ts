import { Express } from 'express';
import container from '../dependency-injection';
import {ListsPutController} from '../controllers/ListsPutController';
import {ListsGetController} from "../controllers/ListsGetController";

export const register = (app: Express) => {
  const coursesPostController: ListsPutController = container.get(
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
