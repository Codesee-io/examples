FROM public.ecr.aws/lambda/nodejs:12

COPY lambda-layer/ /opt
COPY app.js ./
COPY collector.yaml ./

CMD ["app.handler"]
