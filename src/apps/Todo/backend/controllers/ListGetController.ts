
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {Controller} from "./Controller";
import {QueryBus} from "@/Contexts/Shared/domain/QueryBus";
import {ListResponse} from "@/Contexts/Todo/List/application/ListsResponse";
import {ListsQuery} from "@/Contexts/Todo/List/application/Find/ListsQuery";
import { ListQuery } from "@/Contexts/Todo/List/application/Find/ListQuery";

export class ListGetController implements Controller {

  constructor(private readonly queryBus: QueryBus) {}
  async run(req: Request, res: Response): Promise<void> {
    const response = await this.queryBus.ask<ListResponse>(new ListQuery(
      req.params.id
    ));

    res.status(httpStatus.OK).send(response);
  }
}
