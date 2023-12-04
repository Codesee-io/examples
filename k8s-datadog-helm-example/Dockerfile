FROM node:alpine

# Copy example express app
COPY index.js .
COPY package.json .
RUN npm i
EXPOSE 3000

CMD ["npm", "start"]
