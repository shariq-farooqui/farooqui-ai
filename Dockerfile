# Two stages: bun builds the static Astro site; nginx-unprivileged serves it on :8080.
# Base images pinned to patch versions so rebuilds are reproducible; dependabot handles bumps.

FROM oven/bun:1.3.13-alpine AS builder

WORKDIR /repo

COPY --link package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY --link astro.config.ts tsconfig.json ./
COPY --link src ./src
COPY --link public ./public

RUN bun run build


FROM nginxinc/nginx-unprivileged:1.30.0-alpine3.23 AS runtime

USER 101
COPY --link nginx.conf /etc/nginx/conf.d/default.conf
COPY --link --from=builder /repo/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
