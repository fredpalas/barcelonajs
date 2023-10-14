import { ListRepository } from "@/Contexts/Todo/List/domain/ListRepository";
import { ListId } from "@/Contexts/Todo/List/domain/ListId";

export class ListDeleter
{
  constructor(private repository: ListRepository) {
  }

  async run(id: ListId) {
    await this.repository.delete(id);
  }
}