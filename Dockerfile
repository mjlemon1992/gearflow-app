FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./
COPY src ./src

RUN ls -la src/ && cat index.html && cat vite.config.js

RUN node_modules/.bin/vite build; true

RUN ls -la build/ 2>&1 || echo "No build folder created"

COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
