# NestJS integration with OpenTelemetry library + CodeSee example

A sample Typescript application using the otel lib to send Traces data to CodeSee.

## Copy .env file

Copy and update .env file to match your environment

```
cp env-example .env
```

## Install required packages:

```
npm i
```

## Start the sample app:

```
npm start
```

## Make sample requests to see traces

Make few requests to the url below to see Traces data at CodeSee Service Map UI.

```
curl localhost:8080
```

Go to https://app.codesee.io/service-maps/ to see Traces.

## More info:

https://docs.codesee.io/docs/node-opentelemetry
