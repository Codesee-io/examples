# Serverless + Golang + Amazon Linux 2 (provided.al2) + CodeSee example

Using AL2 runtime + Datadog serverless plugin + CodeSee Layer Configured

## Installation:

```
serverless plugin install --name serverless-plugin-datadog
serverless plugin install --name serverless-go-plugin
go get github.com/DataDog/datadog-lambda-go
```

## Set required environment variables for CodeSee:

```
DD_APM_DD_URL: http://127.0.0.1:8080
DD_APM_NON_LOCAL_TRAFFIC: true
DD_APM_ENABLED: true
CODESEE_BRIDGE_FORWARD_HOST: https://in-datadog.codesee.io
CODESEE_BRIDGE_TOKEN: <YOUR_CODESEE_TOKEN>
```

## Deploy
```
sls deploy --aws-profile <your-aws-profile> --region us-east-1
```

## More info:

https://docs.codesee.io/docs/lambda-configuration-examples#serverless
