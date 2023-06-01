const grpc = require('@grpc/grpc-js');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc");
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const codeseeToken = process.env.CODESEE_TOKEN; // !! CodeSee auth token
const metadata = new grpc.Metadata();
metadata.set('Authorization', `Bearer ${codeseeToken}`);

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "https://in-otel.codesee.io:443/v1/traces", // CodeSee endpoint
    credentials: grpc.credentials.createSsl(),
    metadata,
  }),
  resource: Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,  // !! NAME YOUR SERVICE !!
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.DEPLOYMENT_ENVIRONMENT, // !! SET YOUR ENVIRONMENT
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION, // (optional) set version
    })
  ),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
