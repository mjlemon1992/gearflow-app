FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps 2>&1 || (cat /root/.npm/_logs/*.log && exit 1)

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
