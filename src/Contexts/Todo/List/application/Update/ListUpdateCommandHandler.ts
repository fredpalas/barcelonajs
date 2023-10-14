import { CommandHandler } from "@/Contexts/Shared/domain/CommandHandler";
import { ListUpdaterCommand } from "@/Contexts/Todo/List/application/Update/ListUpdaterCommand";
import { Command } from "@/Contexts/Shared/domain/Command";
import { ListUpdater } from "@/Contexts/Todo/List/application/Update/ListUpdater";
import { ListId } from "@/Contexts/Todo/List/domain/ListId";
import { ListTitle } from "@/Contexts/Todo/List/domain/ListTitle";
import { ListDescription } from "@/Contexts/Todo/List/domain/ListDescription";
import { ListType, Type } from "@/Contexts/Todo/List/domain/ListType";

export class ListUpdateCommandHandler implements CommandHandler<ListUpdaterCommand>
{
  constructor(private updater: ListUpdater) {
  }
  async handle(command: ListUpdaterCommand): Promise<void> {
    await this.updater.run(
      new ListId(command.id),
      command.title ? new ListTitle(command.title) : undefined,
      command.description ? new ListDescription(command.description) : undefined,
      command.type ? new ListType(command.type) : undefined
    );
  }

  subscribedTo(): Command {
    return ListUpdaterCommand;
  }

}