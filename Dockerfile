# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build argument for Helius API key (passed securely at build time)
ARG VITE_HELIUS_API_KEY=""
ENV VITE_HELIUS_API_KEY=$VITE_HELIUS_API_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app (environment variables are inlined during build)
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./

# Create volume data file with initial data if it doesn't exist
RUN echo '{"totalVolume":0,"lastUpdated":null,"last24hVolume":0,"startDate":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","history":[]}' > volume-data.json

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
