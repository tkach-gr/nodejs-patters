FROM node:16.13.1

WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]