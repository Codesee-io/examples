# Example Kubernetes + Datadog Helm + CodeSee integration via Datadog Dual Shipping

This example show how to send Traces data from datadog-agent launched via Datadog Helm running under Kubernetes to CodeSee via Datadog Dual Shipping.

Datadog supports Dual Shipping of traces to another provider such as CodeSee: [more info](https://docs.datadoghq.com/agent/configuration/dual-shipping/#dual-shipping-in-kubernetes)

## Getting Started

Install the helm repo and create Secrets for Datadog API Key and CodeSee Ingestion Token

```shell
# add repo
helm repo add datadog https://helm.datadoghq.com
helm repo update

# create secret for DD API Key
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY

# create secret for CodeSee Ingestion Token:
kubectl create secret generic codesee-secret --from-literal 'DD_APM_ADDITIONAL_ENDPOINTS={"https://in-datadog.codesee.io": ["CodeSee_Ingestion_Token_Here"]}'

# install the Datadog helm chart:
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

## Local Testing

Run k8s and minikube locally to test the integration to CodeSee is working

```shell
# install minikube
brew install minikube

# start minikube
minikube start

# build Docker image via minikube so it's available in k8s
minikube image build -t k8s-datadog-helm-dual-shipping-example .

# create k8s Deployment / Service
kubectl create -f app.yaml

# verify that the container is up and running
kubectl get pods

# restart as needed
kubectl rollout restart deployment example-deploy

# get the port and send traffic to example Node app
minikube service example-service

# Go to Datadog and CodeSee to see traces!
https://app.codesee.io/service-maps/
```

## Additional Resources

CodeSee's [instructions for Datadog Integration](https://docs.codesee.io/docs/integration-with-datadog)
