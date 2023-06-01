# serverless-lambda-container-otel-example

Example Serverless + Lambda Container + OpenTelemetry integration

## Install packages

```
npm i
```

## Copy the public OpenTelemetry Lamda Layer

Note: change the `arm64` to `amd64` in the ARN below based on your Lambda architecture.
The Lambda ARN is located here: https://aws-otel.github.io/docs/getting-started/lambda/lambda-js

```
# download the public
curl $(aws lambda get-layer-version-by-arn --arn arn:aws:lambda:us-east-2:901920570463:layer:aws-otel-nodejs-arm64-ver-1-12-0:1 --query 'Content.Location' --output text) --output layer.zip

# unzip the content into lambda-layer directory
unzip layer.zip -d lambda-layer/
```

## Deploy Lambda

```
sls deploy
```
