#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { CdkLambdaLayerExampleStack } from '../lib/cdk-lambda-layer-example-stack';

const app = new App();
new CdkLambdaLayerExampleStack(app, 'CdkLambdaLayerExampleStack', {});
