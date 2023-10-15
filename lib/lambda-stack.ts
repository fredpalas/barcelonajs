import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import dotenv from 'dotenv';
import { Queue } from "aws-cdk-lib/aws-sqs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Fn } from "aws-cdk-lib";
dotenv.config();

// import * as sqs from 'aws-cdk-lib/aws-sqs';
interface ServerlessStackProps extends cdk.StackProps {
  vendor: string;
  minify: boolean;
}
let dependencies = [
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
  '@aws-sdk/client-sns',
  'nodemailer',
];

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessStackProps) {
    super(scope, id, props);
    const {minify, vendor} = props;

    const deadLetterQueue = new Queue(this, "LambdaDQL", {
      queueName: `sqs_${vendor}_dql`,
    });
    const queueName= `sqs_${vendor}`;
    const queue = new Queue(this, `LambdaSQS`, {
      queueName: queueName,
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: deadLetterQueue,
      },
      retentionPeriod: cdk.Duration.minutes(10),
      visibilityTimeout: cdk.Duration.minutes(3),
    });

    const topic = new Topic(this, `sns_${vendor}`, {
      displayName: `SNS Messenger for ${vendor}`
    });
    topic.addSubscription(new SqsSubscription(queue));
    const arn = topic.topicArn;
    const environment = {
      NODE_ENV: 'dev',
      TYPEORM_HOST: process.env.TYPEORM_HOST || 'localhost',
      TYPEORM_PORT: '5432',
      TYPEORM_USERNAME: 'postgres',
      TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD || '',
      TYPEORM_DATABASE: 'postgres',
      TOPIC_ARN: arn.toString(),
      NODEMAILER_HOST: process.env.NODEMAILER_HOST || '',
      NODEMAILER_PORT: process.env.NODEMAILER_PORT || '',
      NODEMAILER_USERNAME: process.env.NODEMAILER_USERNAME || '',
      NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD || '',
    };
    const commandHooks = {
      afterBundling: (inputDir: string, outputDir: string): string[] => [
        `npx copy '${inputDir}/src/Contexts/Todo/Shared/infrastructure/config/*.{json,yaml,html,png}' ${outputDir}`,
      ],
      beforeBundling: (inputDir: string, outputDir: string): string[] => [],
      beforeInstall: (inputDir: string, outputDir: string): string[] => [],
    };
    const SqsFunction = new NodejsFunction(this, `sqs_${vendor}`, {
      bundling: {
        externalModules: [],
        minify,
        nodeModules: dependencies,
        commandHooks: commandHooks
      },
      timeout: cdk.Duration.seconds(60),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      functionName: `SQS_handler_${vendor}`,
      entry: path.join(__dirname, `../src/apps/Todo/lambda/sqs/index.ts`),
      environment,
    });
    const eventSource = new SqsEventSource(queue);
    SqsFunction.addEventSource(eventSource);

    const expressFunction = new NodejsFunction(this, `express_${vendor}`, {
      bundling: {
        externalModules: [],
        minify,
        nodeModules: dependencies,
        commandHooks: commandHooks
      },
      timeout: cdk.Duration.seconds(60),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      functionName: `Express_handler_${vendor}`,
      entry: path.join(__dirname, `../src/apps/Todo/lambda/express/index.ts`),
      environment,
    });

    new apigateway.LambdaRestApi(this, 'Gateway', {
      handler: expressFunction,
    });

    topic.grantPublish(SqsFunction);
    topic.grantPublish(expressFunction);
  }
}
