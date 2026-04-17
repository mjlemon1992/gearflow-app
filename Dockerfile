FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./
COPY src ./src

RUN echo 'import React from "react"; import ReactDOM from "react-dom/client"; import App from "./App.jsx"; ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));' > src/index.jsx

RUN apk add --no-cache python3 && python3 -c "
import sys
with open('src/App.jsx', 'rb') as f:
    data = f.read()
# Replace em-dash (e2 80 94) with regular dash
data = data.replace(b'\xe2\x80\x94', b'-')
# Replace en-dash (e2 80 93) with regular dash  
data = data.replace(b'\xe2\x80\x93', b'-')
# Replace smart quotes
data = data.replace(b'\xe2\x80\x9c', b'\"')
data = data.replace(b'\xe2\x80\x9d', b'\"')
data = data.replace(b'\xe2\x80\x98', b\"'\")
data = data.replace(b'\xe2\x80\x99', b\"'\")
with open('src/App.jsx', 'wb') as f:
    f.write(data)
print('Cleaned App.jsx successfully')
"

RUN node_modules/.bin/vite build 2>&1

RUN ls -la build/

COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
