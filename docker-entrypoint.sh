#!/bin/bash

# backend aplication environment variables
[ -z $BACKEND_HOST ] || sed -i "s/BACKEND_HOST.*/BACKEND_HOST=$BACKEND_HOST/g" ./.env
[ -z $BACKEND_PORT ] || sed -i "s/BACKEND_PORT.*/BACKEND_PORT=$BACKEND_PORT/g" ./.env

# run the frontend
npm run-script dev
