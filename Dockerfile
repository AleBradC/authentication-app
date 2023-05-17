FROM node:18.13.0

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY package-lock.json ./

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY server/ server/

USER node

EXPOSE 8080

CMD [ "npm", "start", "--prefix", "server" ]