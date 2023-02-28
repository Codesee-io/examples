import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkLambdaLayerExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const exampleLambda = new lambda.Function(this, 'LayerExampleLambda', {
      functionName: 'CodeSee-Lambda-Layer-Example',
      code: lambda.Code.fromAsset('./src'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(this, 'CodeSeeLayer', 'arn:aws:lambda:us-east-2:666523192759:layer:codesee-dd-bridge:8'),
        lambda.LayerVersion.fromLayerVersionArn(this, 'DDLayer', 'arn:aws:lambda:us-east-2:464622532012:layer:Datadog-Extension:38')
      ]
  })
  }
}
