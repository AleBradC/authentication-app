FROM node:18.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apt-get -q update && apt-get -qy install netcat

COPY . /app

RUN chmod 777 ./wait-for

EXPOSE 8080