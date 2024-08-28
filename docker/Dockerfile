FROM node:16.13.1-alpine AS base

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN apk update && apk add bash
RUN chmod +x ./docker/entrypoint.sh
RUN chmod +x ./docker/start_node.sh
RUN npm install
RUN npm install -g pm2
RUN npx tsc
RUN npm run build

ENTRYPOINT ["/usr/src/app/docker/entrypoint.sh"]
