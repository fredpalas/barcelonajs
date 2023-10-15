import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import compress from "compression";
import Router from "express-promise-router";
import cors from "cors";
import errorHandler from "errorhandler";
import httpStatus from "http-status";
import { registerRoutes } from "./routes";
import serverlessExpress from '@vendia/serverless-express';
import container from "@/apps/Todo/lambda/dependency-injection";
import { register } from "@/apps/Todo/lambda/dependency-injection/express";

let serverlessExpressInstance: any;
export async function main (event: any, context: any)  {
  register(container);
  const main = express();
  const logger =  container.get('Shared.Logger')
  main.use(bodyParser.json());
  main.use(bodyParser.urlencoded({ extended: true }));
  main.use(helmet.xssFilter());
  main.use(helmet.noSniff());
  main.use(helmet.hidePoweredBy());
  main.use(helmet.frameguard({ action: 'deny' }));
  main.use(compress());
  const router = Router();
  router.use(cors());
  router.use(errorHandler());
  main.use(router);
  registerRoutes(router);

  router.use((err: Error, req: Request, res: Response, next: Function) => {
    logger.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  });

  serverlessExpressInstance = serverlessExpress({ app: main })

  return serverlessExpressInstance(event, context)
}

