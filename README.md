# Instalation guide

### 1. Clone this repository from GitHub:

### 2. In project directory run `npm install --save-dev`

### 3. Run project in developer mode `npm run-script dev`

## Available Scripts

### `npm run-script dev`
start webpack server in developer mode


### `npm  build`
build project


### `npm install && npm run-script dev`
install latest updates after `git pull` and run development server

## Docker

1. `docker build -t frontend:latest .` - Build the image from Dockerfile
2. e.g. `docker run -d --name frontend -p 80:80 -e BACKEND_HOST=10.0.0.1 frontend` - Run the container from image `frontend`

For all available container environments refer to the [docker-entrypoint file](./docker-entrypoint.sh)

## Other Sources

#### UI is based on components library Material UI:
https://material-ui.com/
