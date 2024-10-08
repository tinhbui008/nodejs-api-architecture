FROM node:16
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
# CMD npm start
EXPOSE 3058
CMD ["npm", "start"]  
