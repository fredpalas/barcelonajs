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
dotenv.config();

interface ServerlessStackProps extends cdk.StackProps {
  vendor: string;
  minify: boolean;
}
// External dependencies
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
    // Create a new dead letter queue with default properties
    const deadLetterQueue = new Queue(this, "LambdaDQL", {
      queueName: `sqs_${vendor}_dql`,
    });
    const queueName= `sqs_${vendor}`;
    // Create a new queue with default properties and dead letter queue configured above
    const queue = new Queue(this, `LambdaSQS`, {
      queueName: queueName,
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: deadLetterQueue,
      },
      retentionPeriod: cdk.Duration.minutes(10),
      visibilityTimeout: cdk.Duration.minutes(3),
    });
    // Create a new topic to receive messages published to it
    const topic = new Topic(this, `sns_${vendor}`, {
      displayName: `SNS Messenger for ${vendor}`
    });
    // Subscribe the queue to the topic
    topic.addSubscription(new SqsSubscription(queue));
    // Get the ARN of the topic
    const arn = topic.topicArn;
    // Create a new lambda function with default properties and add the topic ARN to the environment variables
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
    // Create command hooks we need to run before and after bundling, to have files necessary to run the application
    const commandHooks = {
      afterBundling: (inputDir: string, outputDir: string): string[] => [
        `npx copy '${inputDir}/src/Contexts/Todo/Shared/infrastructure/config/*.{json,yaml,html,png}' ${outputDir}`,
      ],
      beforeBundling: (inputDir: string, outputDir: string): string[] => [],
      beforeInstall: (inputDir: string, outputDir: string): string[] => [],
    };
    // Create a new lambda function with default properties and add the queue to the environment variables for SQS
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
    // Add the queue as an event source for the lambda function
    const eventSource = new SqsEventSource(queue);
    SqsFunction.addEventSource(eventSource);
    // Create a new NodeJS lambda function with default properties and add the topic to the environment variables, api gateway
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
    // Create a new API Gateway with default properties and add the lambda function as the handler
    new apigateway.LambdaRestApi(this, 'Gateway', {
      handler: expressFunction,
    });
    // Grant the lambda function permissions to publish to the topic from SQS
    topic.grantPublish(SqsFunction);
    // Grant the lambda function permissions to publish to the topic from Express
    topic.grantPublish(expressFunction);
  }
}
