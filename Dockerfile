FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./
COPY src ./src

RUN apk add --no-cache python3

RUN python3 -c "data=open('src/App.jsx','rb').read();data=data.replace(b'\xe2\x80\x94',b'-');data=data.replace(b'\xe2\x80\x93',b'-');open('src/App.jsx','wb').write(data);print('Cleaned',len(data),'bytes')"

RUN echo 'import React from "react"; import ReactDOM from "react-dom/client"; import App from "./App.jsx"; ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));' > src/index.jsx

RUN NODE_OPTIONS="--max-old-space-size=4096" node_modules/.bin/vite build --logLevel silly 2>&1 || true

RUN ls build/ 2>&1 || echo "BUILD FOLDER MISSING"

COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
