# Example single Docker container: CodeSee + Datadog (Heroku)

## Getting Started

```
# build Docker image
docker build -t example-trace

# start the container, passing in 2 required env vars
docker run --rm -e DD_API_KEY=xxx -e CODESEE_BRIDGE_TOKEN=xxx -p 3000:3000 example-trace

# send sample traffic to Node app
curl localhost:3000

# Go to Datadog and CodeSee to see traces!
https://app.codesee.io/service-maps/
```

## Sample Deploy to Heroku via Github Action

This sample repo also includes instruction how to deploy this sample tracing app to Heroku.

Please take a look at `.github/workflows/heroku.yml` file

## Additional Resources
Datadog's [instructions for Heroku](https://docs.datadoghq.com/agent/basic_agent_usage/heroku/)
CodeSee's [instructions for Datadog Integration](https://docs.codesee.io/docs/integration-with-datadog)
