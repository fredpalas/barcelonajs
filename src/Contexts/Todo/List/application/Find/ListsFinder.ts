import {ListRepository} from "../../domain/ListRepository";

export class ListsFinder {
  constructor(private repository: ListRepository) {
  }

  async run() {
    return await this.repository.searchAll();
  }

}
