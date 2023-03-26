FROM node:16
RUN mkdir server
COPY package.json ./server
COPY . ./server
COPY *. ./server
WORKDIR /server
RUN rm -rf node_modules
RUN npm install
RUN npm install -g nodemon
CMD npm start