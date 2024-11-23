FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy backend source and public files
COPY . .

# Expose port
ENV PORT=3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]