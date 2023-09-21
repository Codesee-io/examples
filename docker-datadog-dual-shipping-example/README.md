# Example Docker Compose: CodeSee + Datadog (agent) Dual Shipping

Datadog supports Dual Shipping of traces to another provider such as CodeSee: [more info](https://docs.datadoghq.com/agent/guide/dual-shipping/)

## Getting Started

```
# copy the env-example and replace its content
cp env-example .env

# build Docker image
docker compose up

# send sample traffic to Node app
curl localhost:3000

# Go to Datadog and CodeSee to see traces!
https://app.codesee.io/service-maps/
```

## Additional Resources

CodeSee's [instructions for Datadog Integration](https://docs.codesee.io/docs/integration-with-datadog)
