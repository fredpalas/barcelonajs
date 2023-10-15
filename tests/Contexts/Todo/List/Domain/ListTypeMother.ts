import { ListType, Type } from "../../../../../src/Contexts/Todo/List/domain/ListType";

export class ListTypeMother
{
    static create(value: Type): ListType
    {
        return new ListType(value);
    }

    static random(): ListType
    {
        return this.create(ListType.random(Object.values(Type)));
    }
}