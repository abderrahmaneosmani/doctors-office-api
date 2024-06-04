# Base Image
FROM node:18-alpine

# Working Directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN  npm install

# Copy project files
COPY . .

# Build (if needed)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
