import { Query } from "@/Contexts/Shared/domain/Query";

export class ListQuery implements Query
{
    constructor(public readonly id: string) {}
}