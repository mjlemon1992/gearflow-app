FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx vite build 2>&1

EXPOSE 3000

CMD ["node", "server.js"]
