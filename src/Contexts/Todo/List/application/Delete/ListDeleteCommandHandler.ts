import { CommandHandler } from "@/Contexts/Shared/domain/CommandHandler";
import { ListDeleteCommand } from "@/Contexts/Todo/List/application/Delete/ListDeleteCommand";
import { ListDeleter } from "@/Contexts/Todo/List/application/Delete/ListDeleter";
import { Command } from "@/Contexts/Shared/domain/Command";
import { ListId } from "@/Contexts/Todo/List/domain/ListId";

export class ListDeleteCommandHandler implements CommandHandler<ListDeleteCommand>
{
    constructor(private deleter: ListDeleter) {
    }

    subscribedTo(): Command {
        return ListDeleteCommand;
    }

    async handle(command: ListDeleteCommand): Promise<void> {
        await this.deleter.run(new ListId(command.id));
    }
}