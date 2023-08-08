FROM node:20-bullseye

# Datadog required environment variables
ENV DD_APM_ENABLED true
ENV DD_APM_NON_LOCAL_TRAFFIC true
# leave this key as empty but pass in the actual value via docker run. Ex: docker run -e DD_API_KEY=xyz
ENV DD_API_KEY ""
ENV DD_ENV staging
# ENV DD_APM_DD_URL http://localhost:8080
# replace with your service name
ENV DD_SERVICE docker-datadog-dual-shipping-example

# optional, un-comment to enable debug logging for Datadog and CodeSee agent
ENV DD_TRACE_DEBUG true

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

# Copy your Datadog configuration
COPY datadog.yaml /etc/datadog-agent/

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
