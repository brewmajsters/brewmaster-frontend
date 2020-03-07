ARG NODE_VERSION=13

FROM node:${NODE_VERSION}-buster
MAINTAINER brewmasters

ADD . /brewmaster-frontend
WORKDIR /brewmaster-frontend

RUN npm build . && npm install

ENTRYPOINT ["npm", "run-script", "dev"]
