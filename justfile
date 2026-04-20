# farooqui.ai — personal site.

set shell := ["bash", "-c"]

default:
    @just --list

install:
    bun install

dev:
    bun run dev

build:
    bun run build

preview:
    bun run preview

check:
    bun run check

lint:
    bun run lint

format:
    bun run format

# Local docker build. Image tagged as farooqui-ai/personal:local.
docker-build:
    docker build -t farooqui-ai/personal:local .

# Run the local image on :8080.
docker-run port="8080":
    docker run --rm -p {{port}}:8080 farooqui-ai/personal:local

clean:
    rm -rf dist .astro node_modules
