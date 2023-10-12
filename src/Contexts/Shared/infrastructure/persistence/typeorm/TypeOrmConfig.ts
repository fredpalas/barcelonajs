import { MixedList } from "typeorm/common/MixedList";
import { EntitySchema } from "typeorm/entity-schema/EntitySchema";

export interface TypeOrmConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities?: MixedList<Function | string | EntitySchema>;
}
