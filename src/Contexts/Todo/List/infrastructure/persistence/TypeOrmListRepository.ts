import {TypeOrmRepository} from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import {ListRepository} from "../../domain/ListRepository";
import List from "../../domain/List";
import {EntitySchema} from "typeorm";
import {ListEntity} from "./typeorm/ListEntity";
import {ListId} from "../../domain/ListId";

export class TypeOrmListRepository extends TypeOrmRepository<List> implements ListRepository {
  protected entitySchema(): EntitySchema<List> {
    return ListEntity;
  }

  public async save(list: List): Promise<void> {
    return this.persist(list);
  }

  public async search(id: ListId): Promise<List|null> {
    const repository = await this.repository();
    console.log(id.value);
    // @ts-ignore
    const list = await repository.findOneBy({ id: id });

    return list ?? null;
  }

  public async searchAll(): Promise<List[]> {
    const repository = await this.repository();

    return  await repository.find();
  }

  public async delete(id: ListId): Promise<void> {
    const repository = await this.repository();

    // @ts-ignore
    await repository.delete({ id });
  }
}
