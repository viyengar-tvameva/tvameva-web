# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# Build-time environment variables
ARG DRUPAL_BASE_URL=http://drupal-service:8080
ARG SITE_URL=https://tvameva.ai
ARG NEXT_PUBLIC_USE_CMS=false

ENV DRUPAL_BASE_URL=$DRUPAL_BASE_URL
ENV SITE_URL=$SITE_URL
ENV NEXT_PUBLIC_USE_CMS=$NEXT_PUBLIC_USE_CMS

RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
