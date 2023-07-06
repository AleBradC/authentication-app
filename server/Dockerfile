FROM node:18.13.0

# Set the working directory to /src
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any needed packages specified in package.json and other dependencies
RUN npm install
RUN apt-get -q update && apt-get -qy install netcat

# Copy the rest of the application code to the container
COPY . /app

# Others 
RUN chmod 777 ./wait-for

# Expose port 3000 for the Express server
EXPOSE 8080