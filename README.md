# farooqui-ai

[![publish](https://github.com/shariq-farooqui/farooqui-ai/actions/workflows/publish.yaml/badge.svg)](https://github.com/shariq-farooqui/farooqui-ai/actions/workflows/publish.yaml)
[![release](https://img.shields.io/github/v/release/shariq-farooqui/farooqui-ai?display_name=tag&sort=semver)](https://github.com/shariq-farooqui/farooqui-ai/releases)
[![licence](https://img.shields.io/github/license/shariq-farooqui/farooqui-ai)](./LICENSE)

The source for [farooqui.ai](https://farooqui.ai), my personal site and
consultancy page.

It's a single-page Astro site with sections for About, Now, Consultancy,
Work, Recommendations, and Contact. All the copy lives in
`src/content/site.ts`, so edits don't touch components. Cal.eu is wired
in for the booking modal.

## Run it locally

    just install
    just dev          # http://localhost:4321
    just build        # produces dist/
    just lint         # biome
    just check        # astro check

## Run it as a container

    just docker-build
    just docker-run   # http://localhost:8080

Both the Bun builder and the nginx runtime are pinned to exact patch
versions, and Dependabot bumps them weekly.

## Deployment

The container runs on my homelab k3s cluster. Releases are tag-driven:

    git tag v0.1.0
    git push origin v0.1.0

That kicks off `.github/workflows/publish.yaml`, which builds the image,
pushes it to `ghcr.io/shariq-farooqui/farooqui-ai/personal`, scans it
with Trivy, and signs it with cosign. PRs only run lint, type-check,
and build.

## Licence

MIT.
