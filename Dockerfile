# syntax=docker/dockerfile:1.7

FROM node:20.19.4-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# pnpm for the build
RUN npm install -g pnpm@latest-10

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# If your build still reads MongoDB during next build, keep this:
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:20.19.4-bookworm-slim AS runner
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs \
 && mkdir -p /app/.next/cache \
 && chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Keep the cache directory writable at runtime
RUN mkdir -p /app/.next/cache \
 && chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]