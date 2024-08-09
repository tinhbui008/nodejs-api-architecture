FROM node:16

WORKDIR /A-LAM
COPY package.json .
RUN npm install
COPY . .
CMD npm start