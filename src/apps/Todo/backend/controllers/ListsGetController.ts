
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {Controller} from "./Controller";
import {QueryBus} from "../../../../Contexts/Shared/domain/QueryBus";
import {ListsResponse} from "../../../../Contexts/Todo/List/application/ListsResponse";
import {ListsQuery} from "../../../../Contexts/Todo/List/application/Find/ListsQuery";

export class ListsGetController implements Controller {

  constructor(private readonly queryBus: QueryBus) {}
  async run(req: Request, res: Response): Promise<void> {
    const response = await this.queryBus.ask<ListsResponse>(new ListsQuery());

    res.status(httpStatus.OK).send(response.lists);
  }
}
