import { QueryHandler } from "@/Contexts/Shared/domain/QueryHandler";
import List from "@/Contexts/Todo/List/domain/List";
import { ListQuery } from "@/Contexts/Todo/List/application/Find/ListQuery";
import { ListResponse } from "@/Contexts/Todo/List/application/ListsResponse";
import { Query } from "@/Contexts/Shared/domain/Query";
import { ListFinder } from "@/Contexts/Todo/List/application/Find/ListFinder";
import { ListId } from "@/Contexts/Todo/List/domain/ListId";


export class ListQueryHandler implements QueryHandler<ListQuery, ListResponse>
{
  constructor(private readonly listFinder: ListFinder) {
  }

  async handle(query: ListQuery): Promise<ListResponse> {
    const resolve = await this.listFinder.run(new ListId(query.id));

    return resolve.toPrimitives();
  }

  subscribedTo(): Query {
    return ListQuery;
  }

}