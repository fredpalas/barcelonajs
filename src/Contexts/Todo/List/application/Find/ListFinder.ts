import { ListId } from "@/Contexts/Todo/List/domain/ListId";
import List from "@/Contexts/Todo/List/domain/List";
import { ListNotExist } from "@/Contexts/Todo/List/domain/ListNotExist";
import { ListRepository } from "@/Contexts/Todo/List/domain/ListRepository";

export class ListFinder {
  constructor(private listRepository: ListRepository) {}

  async run(id: ListId): Promise<List> {
    const list = await this.listRepository.search(id);

    if (list === null) {
      throw new ListNotExist(id);
    }

    return list;
  }
}