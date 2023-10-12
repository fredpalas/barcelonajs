import {CommandHandler} from '../../../../Shared/domain/CommandHandler';
import {ListCreator} from './ListCreator';
import {CreateListCommand} from './CreateListCommand';
import {Command} from '../../../../Shared/domain/Command';
import {ListId} from '../../domain/ListId';
import {ListTitle} from '../../domain/ListTitle';
import {ListDescription} from '../../domain/ListDescription';
import {ListType} from '../../domain/ListType';

export class CreateListCommandHandler implements CommandHandler<CreateListCommand> {
  constructor(private creator: ListCreator) {}

  subscribedTo(): Command {
    return CreateListCommand;
  }

  async handle(command: CreateListCommand): Promise<void> {
    await this.creator.run(
      {
        id: new ListId(command.id),
        title: new ListTitle(command.title),
        description: new ListDescription(command.description),
        type: new ListType(command.type),
      },
    );
  }
}