import { Command } from "@/Contexts/Shared/domain/Command";
import { Type } from '../../domain/ListType';

type Params = {
  id: string;
  title?: string;
  description?: string;
  type?: Type;
};
export class ListUpdaterCommand extends Command
{
  id: string;
  title?: string;
  description?: string;
  type?: Type;

  constructor({ id, title, description, type }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
  }
}