FROM node:18.13.0

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000