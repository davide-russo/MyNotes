FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${SERVER_PORT}
CMD [ "npm", "start" ]
