FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./
COPY src ./src

RUN ls -la src/

RUN node_modules/.bin/vite build --debug 2>&1; echo "Exit code: $?"

EXPOSE 3000

COPY server.js ./
CMD ["node", "server.js"]
