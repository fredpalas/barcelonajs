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
      transformer: ValueObjectTransformer(ListTitle),
      name: 'title'
    }
  )
  private _title: ListTitle;
  @Column(
    {
      type: String,
      transformer: ValueObjectTransformer(ListDescription),
      name: 'description'
    }
  )
  private _description: ListDescription;
  @Column(
      {
        type: String,
        transformer: ValueObjectTransformer(ListType),
        name: 'type'
      }
    )
  private _type: ListType;

  constructor(
    id: ListId,
    title: ListTitle,
    description: ListDescription,
    type: ListType,
    createdAt: null|Date = null,
    updatedAt: null|Date = null
  ) {
    super();
    this._type = type;
    this._description = description;
    this._title = title;
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
    updatedAt: null|Date = null
  ): List {
    const list = new List(id, title, description, type, createdAt, updatedAt);

    list.record(new ListCreatedDomainEvent(
      {
        aggregateId: list.id.value,
        title: list._title.value,
        description: list._description.value,
        type: list._type.value,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
      }
    ));

    return list;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this._title.value,
      description: this._description.value,
      type: this._type.value,
      createdAt: this.createdAt,
    };
  }

  changeTitle(title: ListTitle) {
    this._title = title;
  }

  get title(): ListTitle {
    return this._title;
  }

  get description(): ListDescription {
    return this._description;
  }

  changeDescription(description: ListDescription) {
    this._description = description;
  }

  get type(): ListType {
    return this._type;
  }

  changeType(type: ListType) {
    this._type = type;
  }
}