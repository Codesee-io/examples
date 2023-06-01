'use strict'
require("./collector");

const http = require('http');

// make a sample http get request to codesee.io to see on it on the CodeSee Service Map
http.get('http://codesee.io', (res) => {
  res.on('data', (chunk) => {
    console.log(res.statusCode);
  });
  res.on('end', () => {
    console.log('done with http request');
  });
})

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
