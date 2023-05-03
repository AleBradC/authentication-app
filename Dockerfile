FROM node:18.13.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm install --only=production

USER node

CMD [ "npm", "start" ]

EXPOSE 8000