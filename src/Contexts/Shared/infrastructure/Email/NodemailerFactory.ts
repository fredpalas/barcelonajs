import nodemailer, { Transporter } from "nodemailer";

export interface NodemailerConfig {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  }
}

export class NodemailerFactory {
  static create(config: NodemailerConfig): Transporter {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass
      }
    })
  }
}