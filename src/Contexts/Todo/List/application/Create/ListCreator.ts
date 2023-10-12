import {ListRepository} from "../../domain/ListRepository";
import List from "../../domain/List";
import {ListType} from "../../domain/ListType";
import {ListId} from "../../domain/ListId";
import {ListTitle} from "../../domain/ListTitle";
import {ListDescription} from "../../domain/ListDescription";

export class ListCreator {
  constructor(
    private readonly repository: ListRepository
  ) {
  }

  async run(
    params: {
      id: ListId,
      title: ListTitle,
      description: ListDescription,
      type: ListType,
    }
  ) :Promise<List> {
    const {id, title, description, type} = params;
    const list = List.create(
      id,
      title,
      description,
      type
    )
    //await this.repository.save(list);
    //await this.eventBus.publish(list.pullDomainEvents())

    return list;
  }
}