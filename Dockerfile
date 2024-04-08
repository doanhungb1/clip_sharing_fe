# Use the official Node 20.10 image as the base image
FROM node:20.10

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Expose the port on which the React app will run (if necessary)
# EXPOSE 3000

# Command to start the React app
CMD ["npm", "start"]