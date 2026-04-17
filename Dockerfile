FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./
COPY src ./src

RUN apk add --no-cache python3

RUN python3 -c "data=open('src/App.jsx','rb').read();data=data.replace(b'\xe2\x80\x94',b'-');data=data.replace(b'\xe2\x80\x93',b'-');data=data.replace(b'\xe2\x80\x9c',b'\"');data=data.replace(b'\xe2\x80\x9d',b'\"');open('src/App.jsx','wb').write(data);print('Cleaned')"

RUN echo 'import React from "react"; import ReactDOM from "react-dom/client"; import App from "./App.jsx"; ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));' > src/index.jsx

RUN node_modules/.bin/vite build 2>&1

RUN ls -la build/

COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
