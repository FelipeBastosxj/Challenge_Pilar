FROM node:lts-alpine as global-deps-stage
RUN npm i --location=global @quasar/cli@latest

FROM global-deps-stage as develop-stage
WORKDIR /src
COPY package.json ./
COPY . .
# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
FROM develop-stage as local-deps-stage
RUN yarn
#
FROM local-deps-stage as build-stage
RUN quasar build -m spa

FROM nginx:stable-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /src/dist/spa /usr/share/nginx/html
EXPOSE 80

EXPOSE 8080
CMD [ "nginx","-g", "daemon off;" ]