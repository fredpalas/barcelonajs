import { TypeOrmConfig } from "@/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmConfig";
import config from "@/Contexts/Todo/Shared/infrastructure/config";
import List from "@/Contexts/Todo/List/domain/List";
import { NodemailerConfig } from "@/Contexts/Shared/infrastructure/Email/NodemailerFactory";

export class NodemailerConfigFactory {
  static createConfig(): NodemailerConfig {
    return {
      host: config.get('nodemailer.host'),
      port: config.get('nodemailer.port'),
      auth: {
        user: config.get('nodemailer.username'),
        pass: config.get('nodemailer.password'),
      }
    };
  }
}