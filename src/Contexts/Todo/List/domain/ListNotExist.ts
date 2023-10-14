import { ListId } from "./ListId";

export class ListNotExist extends Error {
  constructor(id: ListId) {
    super(`The list <${id.value}> does not exist`);
  }
}