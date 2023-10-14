import List from "./List";
import {Nullable} from "../../../Shared/domain/Nullable";
import {ListId} from "./ListId";

export interface ListRepository {
  save(list: List): Promise<void>;
  search(id: ListId): Promise<List|null>;
  searchAll(): Promise<List[]>;
  delete(id: ListId): Promise<void>;
}
