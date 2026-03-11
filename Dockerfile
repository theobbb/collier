# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Only copy package files first to cache dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest and build
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# SvelteKit (adapter-node) defaults to port 3000
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "build/index.js"]