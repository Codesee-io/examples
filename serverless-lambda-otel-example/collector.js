'use strict'

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc");
const grpc = require('@grpc/grpc-js');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
const { diag, trace, context, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations()
  ],
});

const codeseeToken = process.env.CODESEE_TOKEN;
const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.DEPLOYMENT_ENVIRONMENT,
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION,
  })
);

const provider = new NodeTracerProvider({
  resource
});

const metadata = new grpc.Metadata();
metadata.set('Authorization', `Bearer ${codeseeToken}`);
const exporter = new OTLPTraceExporter({
  credentials: grpc.credentials.createSsl(),
  metadata,
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
