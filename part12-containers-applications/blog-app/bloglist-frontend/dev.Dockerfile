FROM node:18

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
ENV REACT_APP_BACKEND_URL=http://localhost:8080

CMD ["npm", "start"]
