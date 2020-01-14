FROM node:latest

WORKDIR /home/

EXPOSE 80

WORKDIR Website

COPY . .

CMD git pull && yarn install && npm run start
