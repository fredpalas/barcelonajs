import { ListId } from "../../../../../src/Contexts/Todo/List/domain/ListId";
import { ListTitle } from "../../../../../src/Contexts/Todo/List/domain/ListTitle";
import { ListDescription } from "../../../../../src/Contexts/Todo/List/domain/ListDescription";
import { ListType } from "../../../../../src/Contexts/Todo/List/domain/ListType";
import List from "../../../../../src/Contexts/Todo/List/domain/List";
import { ListIdMother } from "./ListIdMother";
import { ListTitleMother } from "./ListTitleMother";
import { ListDescriptionMother } from "./ListDescriptionMother";
import { ListTypeMother } from "./ListTypeMother";

export class ListMother {
  static create(
    id: ListId,
    title: ListTitle,
    description: ListDescription,
    type: ListType,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new List(id, title, description, type, createdAt, updatedAt);
  }

  static random(): List {
    return this.create(
      ListIdMother.random(),
      ListTitleMother.random(),
      ListDescriptionMother.random(),
      ListTypeMother.random()
    );
  }
}
