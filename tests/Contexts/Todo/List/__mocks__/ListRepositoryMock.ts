import List from '../../../../../src/Contexts/Todo/List/domain/List';
import { ListRepository } from "../../../../../src/Contexts/Todo/List/domain/ListRepository";
import { ListId } from "../../../../../src/Contexts/Todo/List/domain/ListId";

export class ListRepositoryMock implements ListRepository {
  private saveMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private lists: Array<List> = [];
  private deleteMock: jest.Mock;
  private searchMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
    this.searchAllMock = jest.fn();
    this.deleteMock = jest.fn();
    this.searchMock = jest.fn();
  }

  async save(course: List): Promise<void> {
    this.saveMock(course);
  }

  assertSaveHaveBeenCalledWith(expected: List): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  returnOnSearchAll(lists: Array<List>) {
    this.lists = lists;
  }

  assertSearchAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async searchAll(): Promise<List[]> {
    this.searchAllMock();
    return this.lists;
  }

  async delete(id: ListId): Promise<void> {
    this.deleteMock(id);
  }

  async search(id: ListId): Promise<List | null> {
    this.searchMock(id);
    return this.lists.find((list) => list.id.equals(id)) || null;
  }

  assertDeleteHaveBeenCalledWith(expected: ListId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(expected);
  }

  assertSearchHaveBeenCalledWith(expected: ListId): void {
    expect(this.searchMock).toHaveBeenCalledWith(expected);
  }
}
