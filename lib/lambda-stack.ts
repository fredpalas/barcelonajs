import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import dotenv from 'dotenv';
dotenv.config();

// import * as sqs from 'aws-cdk-lib/aws-sqs';
interface ServerlessStackProps extends cdk.StackProps {
  vendor: string;
  minify: boolean;
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessStackProps) {
    super(scope, id, props);
    const {minify, vendor} = props;

    const lambdaFunction = new NodejsFunction(this, `express_${vendor}`, {
      bundling: {
        externalModules: [],
        minify,
        nodeModules: [
          'node-dependency-injection',
          'bodybuilder',
          'body-parser',
          'express',
          'express-promise-router',
          'express-validator',
          'compression',
          'errorhandler',
          'helmet',
          'http-status',
          'cors',
          'glob',
          'typeorm',
          'uuid',
          'uuid-validate',
          'yargs-parser',
          'lodash.clonedeep',
          'convict',
          '@vendia/serverless-express',
          'logform',
          'colors',
          'triple-beam',
          'safe-stable-stringify',
          'ms',
          'fecha',
          'winston',
          'util-deprecate',
          'winston-transport',
          'inherits',
          'safe-buffer',
        ],
        commandHooks: {
          afterBundling: (inputDir: string, outputDir: string): string[] => [
            `npx copy '${inputDir}/src/Contexts/Todo/Shared/infrastructure/config/*.{json,yaml,html,png}' ${outputDir}`,
          ],
          beforeBundling: (inputDir: string, outputDir: string): string[] => [],
          beforeInstall: (inputDir: string, outputDir: string): string[] => [],
        },
      },
      timeout: cdk.Duration.seconds(60),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'main',
      functionName: `Express_handler_${vendor}`,
      entry: path.join(__dirname, `../src/apps/Todo/lambda/express/index.ts`),
      environment: {
        NODE_ENV: 'dev',
        TYPEORM_HOST: process.env.TYPEORM_HOST || 'localhost',
        TYPEORM_PORT: '5432',
        TYPEORM_USERNAME: 'postgres',
        TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD || '',
        TYPEORM_DATABASE: 'postgres',
      }
    });

    new apigateway.LambdaRestApi(this, 'Gateway', {
      handler: lambdaFunction,
    });
  }
}
