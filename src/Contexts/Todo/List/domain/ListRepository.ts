import List from "./List";
import {Nullable} from "../../../Shared/domain/Nullable";
import {ListId} from "./ListId";

export interface ListRepository {
  save(list: List): Promise<void>;
  search(id: ListId): Promise<Nullable<List>>;
  searchAll(): Promise<List[]>;
}
