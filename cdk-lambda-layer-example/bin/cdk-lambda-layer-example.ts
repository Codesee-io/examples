#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkLambdaLayerExampleStack } from '../lib/cdk-lambda-layer-example-stack';

const app = new cdk.App();
new CdkLambdaLayerExampleStack(app, 'CdkLambdaLayerExampleStack', {});
