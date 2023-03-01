import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { Api, StackContext } from "sst/constructs";
import { Function } from "sst/constructs";
import { Datadog } from "datadog-cdk-constructs-v2";

const codeseeLayerArn = "arn:aws:lambda:us-east-2:666523192759:layer:codesee-dd-bridge:8";

export function ExampleStack({ stack }: StackContext) {
  const codeseeLayer = LayerVersion.fromLayerVersionArn(stack, "Layer", codeseeLayerArn);

  const datadog = new Datadog(stack, "Datadog", {
    nodeLayerVersion: 87,
    extensionLayerVersion: 38,
    site: "datadoghq.com",
    apiKeySecretArn: "xyz"
  });

  const exampleLambda = new Function(stack, "ExampleLambda", {
    handler: "packages/functions/index.handler",
    layers: [codeseeLayer],
    runtime: "nodejs14.x",
  });

  datadog.addLambdaFunctions([exampleLambda]);
}
