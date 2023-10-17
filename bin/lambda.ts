#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
/**
 * Stack of the lambda we provide an entry point to the application
 */
new LambdaStack(app, 'LambdaStack', {
  minify: false,
  vendor: 'Todo'
});

// new LambdaStack(app, 'ProdLambdaStack', {
//   minify: true,
//   vendor: 'Todo'
// });