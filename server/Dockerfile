FROM node:14

WORKDIR /bezkoder-app
COPY package.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD tail -f /dev/null