import { ListTitle } from "../../../../../src/Contexts/Todo/List/domain/ListTitle";
import { WordMother } from "../../../Shared/domain/WordMother";

export class ListTitleMother
{
    static create(value: string): ListTitle {
        return new ListTitle(value);
    }

    static random(): ListTitle {
        return this.create(WordMother.random({ maxLength: 20 }));
    }
}