module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "hello from serverless-lambda-otel-example lambda",
        input: event,
      },
      null,
      2
    ),
  };
};
