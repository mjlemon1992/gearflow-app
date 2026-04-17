FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx vite build || (echo "VITE BUILD FAILED" && cat vite-error.log 2>/dev/null && exit 1)

EXPOSE 3000

CMD ["node", "server.js"]
