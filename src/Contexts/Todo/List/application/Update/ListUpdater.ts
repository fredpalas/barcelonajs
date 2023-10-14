import { ListRepository } from "@/Contexts/Todo/List/domain/ListRepository";
import { ListId } from "@/Contexts/Todo/List/domain/ListId";
import { ListTitle } from "@/Contexts/Todo/List/domain/ListTitle";
import { ListDescription } from "@/Contexts/Todo/List/domain/ListDescription";
import { ListType } from "@/Contexts/Todo/List/domain/ListType";
import { ListFinder } from "@/Contexts/Todo/List/application/Find/ListFinder";

export class ListUpdater
{
  constructor(
    private repository: ListRepository,
    private finder: ListFinder,
  ) {
  }

  async run(
    id: ListId,
    title?: ListTitle,
    description?: ListDescription,
    type?: ListType
  ) {
    const list = await this.finder.run(id);

    if (title) {
      list.changeTitle(title);
    }

    if (description) {
      list.changeDescription(description);
    }

    if (type) {
      list.changeType(type);
    }

    await this.repository.save(list);
  }
}