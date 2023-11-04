FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "HOST=0.0.0.0 npm start"]
