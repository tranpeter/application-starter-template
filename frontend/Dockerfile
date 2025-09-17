# Copyright (c) 2025 MediDent Inventory Manager

# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Set environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create placeholder files for missing icons if they don't exist
RUN touch public/favicon.ico
RUN mkdir -p public/images
RUN touch public/logo192.png
RUN touch public/logo512.png

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
