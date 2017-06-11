FROM node:7

RUN mkdir -p /app/src
WORKDIR /app
COPY package.json /app/
RUN npm config set registry http://registry.npmjs.org/ && npm install
COPY webpack.config.js /app/
COPY tsconfig.json /app/
COPY package-scripts.js /app/
COPY index.ejs /app/
COPY favicon.ico /app/

EXPOSE 9000
