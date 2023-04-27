FROM node:18

WORKDIR /usr/src/app

COPY . .

COPY --chown=node:node . .
RUN npm ci --only=production

ENV DEBUG=playground:* 
USER node
CMD npm start