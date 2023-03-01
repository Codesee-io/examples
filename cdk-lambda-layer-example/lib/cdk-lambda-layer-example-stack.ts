import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Datadog } from "datadog-cdk-constructs-v2";
import * as sst from "@serverless-stack/resources";
import { Construct } from "constructs";
// import { Api, StackContext } from "sst/constructs";

export class CdkLambdaLayerExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: 87,
      extensionLayerVersion: 38,
      site: "datadoghq.com",
      apiKeySecretArn: "xyz"
    });

    const exampleLambda = new lambda.Function(this, 'LayerExampleLambda', {
      functionName: 'CodeSee-Lambda-Layer-Example',
      code: lambda.Code.fromAsset('./src'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(this, 'CodeSeeLayer', 'arn:aws:lambda:us-east-2:666523192759:layer:codesee-dd-bridge:8'),
      ]
    });

    datadog.addLambdaFunctions([exampleLambda])
  }
}
