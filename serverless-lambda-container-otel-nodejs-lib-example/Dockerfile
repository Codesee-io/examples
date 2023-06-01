FROM public.ecr.aws/lambda/nodejs:12

COPY package.json .
RUN npm i --production

COPY index.js .
COPY tracing.js .

CMD ["index.handler"]
