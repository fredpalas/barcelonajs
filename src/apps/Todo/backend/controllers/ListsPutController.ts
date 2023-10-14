import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import {CreateListCommand} from '../../../../Contexts/Todo/List/application/Create/CreateListCommand';

type CreateCourseRequest = {
  id: string;
  title: string;
  description: string;
  type: string;
};

export class ListsPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request<CreateCourseRequest>, res: Response) {
    await this.createCourse(req);
    res.status(httpStatus.OK).send();
  }

  private async createCourse(req: Request<CreateCourseRequest>) {
    const createListCommand = new CreateListCommand(
      {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
      }
    )

    await this.commandBus.dispatch(createListCommand);
  }
}
