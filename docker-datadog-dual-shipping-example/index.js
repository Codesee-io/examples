// more info: https://docs.datadoghq.com/tracing/trace_collection/library_config/nodejs/
const tracer = require('dd-trace').init(); // this need to be at the top before any other import
const express = require('express')
const http = require('http');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  // make a sample http get request to codesee.io to see on it on the CodeSee Service Map
  http.get('http://codesee.io', (res) => {
    res.on('data', (chunk) => {
      console.log(res.statusCode);
    });
    res.on('end', () => {
      console.log('done with simple http request to codesee.io');
    });
  })

  res.send('Go to https://app.codesee.io/service-maps Service Map to see traces / visualization!')
})

app.listen(port, () => {
  console.log(`Example Node tracing app listening on port ${port}`)
})
