FROM node:alpine

WORKDIR /app

COPY package*.json ./app

RUN npm ci

EXPOSE ${API_PORT}

COPY ./dist ./app

CMD ['node', 'main.js']
