# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project's dependencies
RUN npm install

# Copy the rest of the application's code to the container
COPY . .

# Specify the command to run when the container starts
CMD [ "npm", "start" ]