FROM node:20.17.0-alpine3.19

ENV APP_ENV=local

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Default command - can be overridden by docker-compose.yml
CMD ["npm", "run", "start:dev"]