FROM node:14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY dist ./dist
COPY package.json .
COPY .env .

RUN npm install --only=prod

CMD [ "npm", "run", "start" ]
