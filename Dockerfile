FROM node:18.16.1-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
