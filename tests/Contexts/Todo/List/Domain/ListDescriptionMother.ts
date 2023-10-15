import { ListDescription } from "../../../../../src/Contexts/Todo/List/domain/ListDescription";
import { MotherCreator } from "../../../Shared/domain/MotherCreator";

export class ListDescriptionMother {
  static create(value: string): ListDescription {
    return new ListDescription(value);
  }

  static random(): ListDescription {
    return this.create(MotherCreator.random().lorem.sentence());
  }
}