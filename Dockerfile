FROM node:lts-alpine as build-stage

ARG VUE_APP_BACKEND_URL
ARG VUE_APP_OSTATIC_URL

ENV VUE_APP_BACKEND_URL=${VUE_APP_BACKEND_URL:-http://iris.docker.localhost/api}
ENV VUE_APP_OSTATIC_URL=${VUE_APP_OSTATIC_URL:-http://iris.docker.localhost/data}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
