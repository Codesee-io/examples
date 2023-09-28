# NestJS integration with OpenTelemetry library + CodeSee example

A sample Typescript application using the otel lib to send Traces data to CodeSee.

## How Traces from sample app get into CodeSee?

[tracing.ts](src/tracing.ts): It loads in required otel packages to be able to send Traces data to Codesee.

[main.ts](src/main.ts): Load in the `tracking.ts` and starts it. Make sure to import tracing module before any other modules.

[env-example](env-example): Copy this file as `.env` and update its content to fill in required CodeSee token.

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
