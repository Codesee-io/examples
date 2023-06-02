FROM node:18-alpine AS build

# example Docker multi-stage build that requires system packages
# RUN apk add --no-cache \
#   g++ make py3-pip curl-dev

COPY package.json .
RUN npm i --omit=dev

# 2nd stage, only included built artifacts
FROM public.ecr.aws/lambda/nodejs:18

COPY --from=build /node_modules .

COPY index.js .
COPY tracing.js .

CMD ["index.handler"]
