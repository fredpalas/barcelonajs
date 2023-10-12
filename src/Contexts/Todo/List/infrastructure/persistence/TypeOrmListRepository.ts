import {TypeOrmRepository} from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import {ListRepository} from "../../domain/ListRepository";
import List from "../../domain/List";
import {EntitySchema} from "typeorm";
import {Nullable} from "../../../../Shared/domain/Nullable";
import {ListEntity} from "./typeorm/ListEntity";
import {ListId} from "../../domain/ListId";

export class TypeOrmListRepository extends TypeOrmRepository<List> implements ListRepository {
  protected entitySchema(): EntitySchema<List> {
    return ListEntity;
  }

  public async save(list: List): Promise<void> {
    return this.persist(list);
  }

  public async search(id: ListId): Promise<Nullable<List>> {
    const repository = await this.repository();

    const list = await repository.findOne({ where: {id: id.value} });

    return list ?? null;
  }

  public async searchAll(): Promise<List[]> {
    const repository = await this.repository();

    return  await repository.find();
  }

}
