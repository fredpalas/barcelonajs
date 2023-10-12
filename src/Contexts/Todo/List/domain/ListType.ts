import {EnumValueObject} from "../../../Shared/domain/value-object/EnumValueObject";

export enum Type {
  ALARM = 'ALARM',
  NOTE = 'NOTE',
  NOTIFICATION = 'NOTIFICATION',
  REMINDER = 'REMINDER',
  TASK = 'TASK',
  DELAYED_TASK = 'DELAYED_TASK',
}

export class ListType extends EnumValueObject<Type>{

  constructor(value: Type) {
    super(value, Object.values(Type));
  }

  protected throwErrorForInvalidValue(value: any): void {
    throw new Error(`The value <${value}> is not a valid type`);
  }
}