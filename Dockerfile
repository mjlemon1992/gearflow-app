FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps

COPY index.html ./
COPY vite.config.js ./

RUN mkdir -p src && echo 'import React from "react"; export default function App() { return React.createElement("div", null, "GearFlow Loading..."); }' > src/App.jsx

RUN echo 'import React from "react"; import ReactDOM from "react-dom/client"; import App from "./App.jsx"; ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));' > src/index.jsx

RUN node_modules/.bin/vite build 2>&1

RUN ls -la build/

COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
