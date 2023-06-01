FROM public.ecr.aws/lambda/nodejs:12

COPY lambda-layer/ /opt

COPY package.json .
RUN npm i --production

COPY index.js .
COPY collector.yaml .

CMD ["index.handler"]
