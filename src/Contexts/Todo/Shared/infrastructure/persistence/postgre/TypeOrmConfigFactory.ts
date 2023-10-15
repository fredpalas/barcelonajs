import { TypeOrmConfig } from '../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmConfig';
import config from '../../config';
import List from "../../../../List/domain/List";

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: config.get('typeorm.host'),
      port: config.get('typeorm.port'),
      username: config.get('typeorm.username'),
      password: config.get('typeorm.password'),
      database: config.get('typeorm.database'),
      entities: [
        List,
      ],
    };
  }
}
