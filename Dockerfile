FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
# Use npm ci when lockfile exists; otherwise fallback to npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --omit=dev; \
    fi

# Build stage (not strictly needed for pure Node, but keeps pattern consistent)
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs

# Copy only needed files
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/config.js ./config.js

# Expose port (default 3000, configurable via PORT env)
EXPOSE 3000

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get(`http://localhost:${process.env.PORT||3000}/api-docs`,()=>process.exit(0)).on('error',()=>process.exit(1))"

USER nodeuser

CMD ["node", "src/server.js"]


