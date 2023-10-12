import {DataSource} from 'typeorm';
import {TypeOrmConfigFactory} from '../postgre/TypeOrmConfigFactory';
import { ListEntity } from "../../../../List/infrastructure/persistence/typeorm/ListEntity";
const config = TypeOrmConfigFactory.createConfig();
export const datasource = new DataSource(
  {
    name: 'todo',
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [
      ListEntity
    ],
    synchronize: true,
    logging: true,
    migrationsTableName: 'migrations',
  }
);