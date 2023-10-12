import {DataSource} from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';
export class TypeOrmClientFactory {
  static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    try {
      const connection = new DataSource({
        name: contextName,
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: config.entities ?? [],
        synchronize: true,
        logging: true,
      });
      return await connection.initialize();
    } catch (error) {
      console.log(error);
      return await new DataSource({
        name: contextName,
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: config.entities ?? [],
        synchronize: true,
        logging: true,
      }).initialize();
    }
  }
}
