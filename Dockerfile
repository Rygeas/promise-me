# Base stage
FROM node:23.11.1-slim AS base
WORKDIR /app

# Production dependencies stage
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --prod --ignore-scripts

# Build stage - install all dependencies and build
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Final stage - combine production dependencies and build output
FROM node:23.11.1-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy from build stages
COPY --from=prod-deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=build --chown=nodejs:nodejs /app/public ./public

# Use the nodejs user
USER nodejs

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
