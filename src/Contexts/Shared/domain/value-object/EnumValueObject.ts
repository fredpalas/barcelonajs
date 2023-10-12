import {ValueObject} from "./ValueObject";

export abstract class EnumValueObject<T> extends ValueObject<any> {
  readonly value: T;

  constructor(value: T, public readonly validValues: T[]) {
    super(value as any);
    this.value = value;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
