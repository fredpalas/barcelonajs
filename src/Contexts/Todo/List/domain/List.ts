import {AggregateRoot} from "../../../Shared/domain/AggregateRoot";
import {ListId} from "./ListId";
import {ListTitle} from "./ListTitle";
import {ListDescription} from "./ListDescription";
import {ListType} from "./ListType";
import {ListCreatedDomainEvent} from "./ListCreatedDomainEvent";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ValueObjectTransformer } from "@/Contexts/Shared/infrastructure/persistence/typeorm/ValueObjectTransformer";

@Entity(
  {
    name: 'lists',
  }
)
export default class List extends AggregateRoot {
  @Column({ type: Date, name: 'created_at' })
  readonly createdAt: Date;
  @Column({ type: Date, name: 'updated_at' })
  readonly updatedAt: Date;
  @Column(
    {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ListId)
    }
  )
  readonly id: ListId;
  @Column(
    {
      type: String,
      transformer: ValueObjectTransformer(ListTitle)
    }
  )
  readonly title: ListTitle;
  @Column(
    {
      type: String,
      transformer: ValueObjectTransformer(ListDescription)
    }
  )
  readonly description: ListDescription;
  @Column(
    {
      type: String,
      transformer: ValueObjectTransformer(ListType)
    }
  )
  readonly type: ListType;

  constructor(
    id: ListId,
    title: ListTitle,
    description: ListDescription,
    type: ListType,
    createdAt: null|Date = null,
    updatedAt: Date|null = null
  ) {
    super();
    this.type = type;
    this.description = description;
    this.title = title;
    this.id = id;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  static create(
    id: ListId,
    title: ListTitle,
    description: ListDescription,
    type: ListType,
    createdAt: null|Date = null,
    updatedAt: Date|null = null
  ): List {
    const list = new List(id, title, description, type, createdAt, updatedAt);

    list.record(new ListCreatedDomainEvent(list.toPrimitives()));

    return list;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      type: this.type.value,
      createdAt: this.createdAt,
    };
  }
}