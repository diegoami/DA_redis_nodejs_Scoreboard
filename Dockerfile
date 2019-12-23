FROM node:10
WORKDIR '/var/www/app'
ADD package.json .
ADD scoreboard.js .
EXPOSE 5000
RUN npm install
CMD node scoreboard.js
