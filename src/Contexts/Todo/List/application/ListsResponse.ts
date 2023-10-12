import List from "../domain/List";

export interface ListResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  createdAt: Date;
}

export class ListsResponse {
  public readonly lists: Array<ListResponse>;

  constructor(courses: Array<List>) {
    this.lists = courses.map(list => list.toPrimitives());
  }
}
