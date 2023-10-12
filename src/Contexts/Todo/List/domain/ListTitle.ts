import {StringValueObject} from "../../../Shared/domain/value-object/StringValueObject";
import ListTitleLengthExceeded from "./ListTitleLengthExceeded";

export class ListTitle extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan100Characters(value);
  }

  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new ListTitleLengthExceeded(`The Course Name <${value}> has more than 30 characters`);
    }
  }
}
