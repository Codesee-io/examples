# CodeSee CDK Lambda Layer example using sst (Serverless Stack)

This repo will show you how to use CDK to integrate with CodeSee Lambda Layer
https://docs.codesee.io/docs/lambda-configuration-examples#using-the-dd-bridge-lambda-layer


## Getting Started

```
# go into this example CDK directory
cd sst-cdk-lambda-layer-example

# bootstrap your sst environment
npm run dev

# deploy the example Lambda with Lambda Layers
npm run deploy
```

## Expected Result

You should see a Lambda created with 2 Layers attached like in the screenshot

![layers](docs/sst-lambda-layers.png)
