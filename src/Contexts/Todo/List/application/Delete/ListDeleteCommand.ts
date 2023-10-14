import { Command } from '@/Contexts/Shared/domain/Command';

export class ListDeleteCommand extends Command {
  constructor(public readonly id: string) {
    super();
  }
}
