ARG NODE_VERSION=13

FROM node:${NODE_VERSION}-buster
MAINTAINER brewmasters

ADD . /brewmaster-frontend
WORKDIR /brewmaster-frontend

RUN cp .env.example .env

RUN apt-get update && apt-get install -y jq \
    && jq '.scripts.dev = "webpack-dev-server --no-inline --open --hot --host 0.0.0.0 --port 80"' package.json > package_tmp.json \
    && rm package.json \
    && mv package_tmp.json package.json \
    && npm build . && npm install

ENTRYPOINT ["./docker-entrypoint.sh"]
