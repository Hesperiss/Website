FROM node:latest

WORKDIR /home/

EXPOSE 443

WORKDIR Website

COPY . .

CMD git pull && yarn install && npm run start
