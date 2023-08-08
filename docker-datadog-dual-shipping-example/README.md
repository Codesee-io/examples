# Example single Docker container: CodeSee + Datadog dual shipping

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

## Additional Resources
CodeSee's [instructions for Datadog Integration](https://docs.codesee.io/docs/integration-with-datadog)
