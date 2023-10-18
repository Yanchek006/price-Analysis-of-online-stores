FROM node:alpine3.17

WORKDIR /frontend
COPY ./frontend/package.json /frontend

RUN npm install vite
RUN npm install

COPY ./frontend/ /frontend

CMD ["npm", "run", "dev"]