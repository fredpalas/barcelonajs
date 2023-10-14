import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import {CreateListCommand} from '../../../../Contexts/Todo/List/application/Create/CreateListCommand';
import { ListUpdaterCommand } from "@/Contexts/Todo/List/application/Update/ListUpdaterCommand";

type UpdateCourseRequest = {
  id: string;
  title?: string;
  description?: string;
  type?: string;
};

export class ListPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request<UpdateCourseRequest>, res: Response) {
    await this.createCourse(req);
    res.status(httpStatus.OK).send();
  }

  private async createCourse(req: Request<UpdateCourseRequest>) {
    const createListCommand = new ListUpdaterCommand(
      {
        id: req.params.id,
        title: req.body.title ?? undefined,
        description: req.body.description ?? undefined,
        type: req.body.type ?? undefined,
      }
    )

    await this.commandBus.dispatch(createListCommand);
  }
}
