FROM node:18 AS test-stage

WORKDIR /usr/src/app

COPY . .

ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
ENV REACT_APP_BACKEND_URL=http://localhost:8080
ENV DEBUG=FALSE

RUN npm ci

ENV CI=true

RUN npm test

FROM node:18 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
ENV REACT_APP_BACKEND_URL=http://localhost:8080
ENV DEBUG=FALSE 

RUN npm ci

RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]