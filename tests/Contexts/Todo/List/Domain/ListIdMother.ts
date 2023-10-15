import { ListId } from "../../../../../src/Contexts/Todo/List/domain/ListId";
import { UuidMother } from "../../../Shared/domain/UuidMother";

export class ListIdMother {
    static create(value: string) {
        return new ListId(value);
    }
    static random() {
        return this.create(UuidMother.random());
    }
}