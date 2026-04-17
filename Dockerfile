FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./
COPY src ./src

RUN ls -la && ls -la src/

RUN npx vite build 2>&1

EXPOSE 3000

CMD ["node", "server.js"]
