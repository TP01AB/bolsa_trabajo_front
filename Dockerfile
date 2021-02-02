FROM node:alpine as node

ARG ENV=prod
ARG APP=bolsaTrabajoFront

WORKDIR  /app

COPY ./ /app/

RUN npm ci
RUN npm run build --prod
RUN mv /app/dist/${APP}/* /app/dist/

FROM nginx:alpine

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

