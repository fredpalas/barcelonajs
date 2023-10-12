import {EntitySchema} from "typeorm";
import {ValueObjectTransformer} from "../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer";
import List from "../../../domain/List";
import {ListId} from "../../../domain/ListId";
import {ListTitle} from "../../../domain/ListTitle";
import {ListDescription} from "../../../domain/ListDescription";
import {ListType} from "../../../domain/ListType";

export const ListEntity = new EntitySchema<List>({
  name: 'List',
  tableName: 'lists',
  target: List,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ListId)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(ListTitle)
    },
    description: {
      type: String,
      transformer: ValueObjectTransformer(ListDescription)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(ListType)
    },
    createdAt: {
      name: 'created_at',
      type: Date
    },
    updatedAt: {
      name: 'updated_at',
      type: Date
    }
  }
});