FROM node:20-bullseye

# Datadog required environment variables
ENV DD_API_KEY ""
ENV DD_APM_ENABLED true
ENV DD_APM_NON_LOCAL_TRAFFIC true
ENV DD_ENV staging
ENV DD_APM_DD_URL http://localhost:8080
# replace with your service name
ENV DD_SERVICE docker-datadog-codesee-bridge-example

# CodeSee required environment variables
ENV CODESEE_BRIDGE_TOKEN ""
ENV CODESEE_BRIDGE_FORWARD_HOST https://in-datadog.codesee.io

# optional, un-comment to enable debug logging for Datadog and CodeSee agent
# ENV DD_TRACE_DEBUG true
# ENV CODESEE_ENABLE_ACCESS_LOGS true

# Install GPG dependencies for Datadog
RUN apt-get update \
 && apt-get install -y gnupg apt-transport-https gpg-agent curl ca-certificates

# Add Datadog repository and signing keys
ENV DATADOG_APT_KEYRING="/usr/share/keyrings/datadog-archive-keyring.gpg"
ENV DATADOG_APT_KEYS_URL="https://keys.datadoghq.com"
RUN sh -c "echo 'deb [signed-by=${DATADOG_APT_KEYRING}] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
RUN touch ${DATADOG_APT_KEYRING}
RUN curl -o /tmp/DATADOG_APT_KEY_CURRENT.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_CURRENT.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_CURRENT.public
RUN curl -o /tmp/DATADOG_APT_KEY_C0962C7D.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_C0962C7D.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_C0962C7D.public
RUN curl -o /tmp/DATADOG_APT_KEY_F14F620E.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_F14F620E.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_F14F620E.public
RUN curl -o /tmp/DATADOG_APT_KEY_382E94DE.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_382E94DE.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_382E94DE.public

# Install the Datadog Agent
RUN apt-get update && apt-get -y --force-yes install --reinstall datadog-agent

# Add CodeSee Datadog Bridge
RUN wget https://github.com/Codesee-io/dd-bridge/releases/download/0.194.0/codesee-dd-bridge.x86_64-unknown-linux-musl.tar.gz
RUN wget https://github.com/Codesee-io/dd-bridge/releases/download/0.194.0/codesee-dd-bridge.x86_64-unknown-linux-musl.tar.gz.sha256
RUN shasum -c codesee-dd-bridge.x86_64-unknown-linux-musl.tar.gz.sha256
RUN tar -xf codesee-dd-bridge.x86_64-unknown-linux-musl.tar.gz

# Copy entrypoint
COPY entrypoint.sh .

# Copy example express app
COPY index.js .
COPY package.json .
RUN npm i
EXPOSE 3000

# Expose DogStatsD and trace-agent ports
EXPOSE 8125/udp 8126/tcp

CMD ["/entrypoint.sh"]
