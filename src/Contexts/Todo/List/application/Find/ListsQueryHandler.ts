import {ListsQuery} from "./ListsQuery";
import {QueryHandler} from "../../../../Shared/domain/QueryHandler";
import {ListsResponse} from "../ListsResponse";
import {ListsFinder} from "./ListsFinder";
import {Query} from "../../../../Shared/domain/Query";

export class ListsQueryHandler implements QueryHandler<ListsQuery, ListsResponse> {
  constructor(private readonly listsFinder: ListsFinder) {}

  subscribedTo(): Query {
    return ListsQuery;
  }

  async handle(_query: ListsQuery): Promise<ListsResponse> {
    return new ListsResponse(await this.listsFinder.run());
  }
}
