# Set version latest LTS
FROM node:25.2.1

WORKDIR /app

COPY package*.json .

RUN npm install -g npm@latest && npm install

COPY . .