FROM node:lts-alpine3.19

WORKDIR /app

COPY package*.json ./
COPY ./public ./public
COPY index.js ./

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]