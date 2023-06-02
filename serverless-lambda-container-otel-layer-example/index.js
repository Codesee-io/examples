const bunyan = require('bunyan');
// Lambda comes with aws-sdk v3, this example shows if you need v2, you can override it in package.json
const AWS = require('aws-sdk');
const log = bunyan.createLogger({name: "serverless-lambda-container-otel-layer-example"});

log.info("about to start handler");

module.exports.handler = async (event) => {
  log.info("inside lambda handler");
  log.info(`using AWS version: ${AWS.VERSION}`); // example to show override Lambda included aws-sdk with older version

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "hello from serverless-lambda-container-otel-layer-example lambda",
        input: event,
      },
      null,
      2
    ),
  };
};
