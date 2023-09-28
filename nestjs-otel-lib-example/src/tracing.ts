import { Metadata, credentials } from "@grpc/grpc-js";
import { NodeSDK } from "@opentelemetry/sdk-node";
import * as process from "process";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import * as dotenv from "dotenv";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

dotenv.config();

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const codeseeToken = process.env.CODESEE_TOKEN; // !! CodeSee auth token
const metadata = new Metadata();
metadata.set("Authorization", `Bearer ${codeseeToken}`);

const oltpExporter = new OTLPTraceExporter({
  url: "https://in-otel.codesee.io:443/v1/traces", // !! CodeSee endpoint
  credentials: credentials.createSsl(),
  metadata,
});

export const otelSDK = new NodeSDK({
  traceExporter: oltpExporter,
  resource: Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME, // !! NAME YOUR SERVICE !!
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
        process.env.DEPLOYMENT_ENVIRONMENT, // !! SET YOUR ENVIRONMENT
    })
  ),
  instrumentations: [getNodeAutoInstrumentations(), new NestInstrumentation()],
});

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  otelSDK.shutdown().then(
    () => console.log("otel SDK shut down successfully"),
    (err) => console.log("Error shutting down otel SDK", err)
  );
});
