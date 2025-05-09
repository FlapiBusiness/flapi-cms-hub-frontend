# Set version latest LTS
FROM node:24.0.1

WORKDIR /app

COPY package*.json .

RUN npm install -g npm@latest && npm install

COPY . .