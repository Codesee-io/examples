#!/bin/bash

# start CodeSee Datadog Bridge
./codesee-dd-bridge &

# start Datadog agent
datadog-agent run &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml &

# start sample Node app to capture Traces
node index.js
