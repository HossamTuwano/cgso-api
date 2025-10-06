FROM node:22 AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build 

FROM ubuntu/node:18-24.04_edge AS final

WORKDIR /usr/src/app

COPY dist ./

EXPOSE 3000

CMD [ "node", "dist/src/main" ]

