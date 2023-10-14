import { CommandBus } from "@/Contexts/Shared/domain/CommandBus";
import { Controller } from './Controller';
import { Request, Response } from "express";
import httpStatus from "http-status";
import { CreateListCommand } from "@/Contexts/Todo/List/application/Create/CreateListCommand";
import { ListDeleteCommand } from "@/Contexts/Todo/List/application/Delete/ListDeleteCommand";

export class ListDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}
  
  async run(req: Request, res: Response) {
    await this.deleteList(req);

    res.status(httpStatus.OK).send();
  }

  private async deleteList(req: Request) {
    const deleteListCommand = new ListDeleteCommand(req.params.id);

    await this.commandBus.dispatch(deleteListCommand);
  }
}