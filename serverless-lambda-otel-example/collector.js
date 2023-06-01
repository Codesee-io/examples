const grpc = require('@grpc/grpc-js');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const process = require('process');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const codeseeToken = process.env.CODESEE_TOKEN;
const metadata = new grpc.Metadata();
metadata.set('Authorization', `Bearer ${codeseeToken}`);

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  // traceExporter: new OTLPTraceExporter({
  //   url: "https://in-otel.codesee.io:443/v1/traces",
  //   credentials: grpc.credentials.createSsl(),
  //   metadata,
  // }),
  resource: Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "local-test",  // !! NAME YOUR SERVICE !!
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "staging", // !! SET YOUR ENVIRONMENT
      [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0", // (optional) set version
    })
  ),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
