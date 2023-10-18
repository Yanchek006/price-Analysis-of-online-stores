FROM node:alpine3.17 as build-stage

WORKDIR /frontend

RUN npm install vite

COPY ./frontend/package.json /frontend/
RUN npm install

COPY ./frontend/ /frontend/
RUN npm run build


FROM nginx:1.21.0-alpine

COPY --from=build-stage /frontend/dist  /frontend/dist