# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Install PostgreSQL
RUN apt-get update && \
    apt-get -y install postgresql postgresql-contrib && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Switch to the postgres user and create a new database
USER postgres
RUN /etc/init.d/postgresql start && \
    psql --command "CREATE USER myuser WITH SUPERUSER PASSWORD 'mypassword';" && \
    createdb -O myuser mydb

# Switch back to the root user
USER root

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project's dependencies
RUN npm install

# Copy the rest of the application's code to the container
COPY . .

# Start PostgreSQL and the application
CMD ["npm", "start"]