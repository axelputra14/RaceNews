FROM node:lts-hydrogen

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "app.js"]