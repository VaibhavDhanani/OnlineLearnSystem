FROM node:18-alpine

WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./

# If you have already built and copied the frontend dist files to public/
# COPY backend/public/ ./public/

# Expose port
ENV PORT=3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]