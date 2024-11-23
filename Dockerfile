# Build stage for frontend
FROM node:18-alpine as frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
# Update the constant.js with production URL during build
RUN sed -i "s|http://localhost:3000|https://${RAILWAY_STATIC_URL}|g" src/constant.js
RUN npm run build

# Production stage for backend
FROM node:18-alpine as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend /app/client/dist ./public

# Expose port
ENV PORT=3000
EXPOSE 3000

# Start backend server
CMD ["npm", "start"]