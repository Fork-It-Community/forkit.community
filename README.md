# ↗️ Fork it! Community - Website

![](./public/logo-assets/logo-black.png#gh-light-mode-only)
![](./public/logo-assets/logo-white.png#gh-dark-mode-only)

## Installation

1. Duplicate the `.env.example` file to a new `.env` file, and update the environment variables

```bash
cp .env.example .env
```

2. Install dependencies

```bash
pnpm install
```

3. Development

```bash
# Run the development server
pnpm dev
```

To test directly on your phone, you can run the following command and scan the QR code:

```bash
pnpm dev --host
```

### 🛠️ Local Build & Preview

To test the production build locally, run the following commands:

```bash
pnpm run build:node
pnpm run preview
```

## ✅ End-to-end tests

```bash
pnpm test:e2e
```

That is the whole thing. It builds the site with the node adapter, serves it
on port 4329, runs the suite against it, and shuts down. The first run
downloads Chromium (~150MB); later runs do not. No environment variables and
no secrets are needed.

To run against something already deployed instead of building locally:

```bash
E2E_BASE_URL=https://your-preview.vercel.app pnpm test:e2e
```

`E2E_BASE_URL` is the only switch. When it is set, nothing is built and
nothing is served — the suite just points at that target.

### What it covers

Eleven specs, deliberately thin. Eight run over plain HTTP with no browser at
all, which is sound here because the site has no client-side router: following
a link over HTTP is equivalent to clicking it. The three that do launch a
browser cover the only things that are not — the search palette, the attendee
form, and the nav menus, whose links do not exist until their island hydrates.

Assertions are structural — status codes, content types, a non-empty title, a
floor on rendered text or image size. They never mention actual content, so
adding an event or a person does not break them. URLs come from the sitemap
rather than a hard-coded list, so new content is swept automatically and
drafts are excluded for free.

### Green locally is weaker than green in CI

A local run serves the site through the **node** adapter. CI runs against a
real **Vercel** preview. Vercel-only behaviour therefore cannot be covered
locally and is skipped:

- the ~20 redirects in `vercel.json`, which are applied at Vercel's edge
- ISR, and Vercel's image service

So a local pass means "nothing is broken in the app", not "nothing is broken
in production". CI is the authority.

### In CI

The workflow is triggered by Vercel's `deployment_status`, not by the pull
request, because the preview URL is only known once Vercel has finished — and
because a `deployment_status` workflow can read secrets on Dependabot pull
requests, which is exactly where this suite earns its keep.

No secret is needed as things stand: preview deployments on this project are
publicly reachable. If Deployment Protection is ever switched on, every
request will start returning 401 — at that point generate a bypass token in
Vercel (Settings → Deployment Protection → Protection Bypass for Automation)
and add it as a repository secret named `VERCEL_AUTOMATION_BYPASS_SECRET`.
The workflow already passes it through and the suite already sends it as a
header when it is present, so nothing else needs changing.

One consequence worth knowing: because the run is tied to a deployment, it
reports nothing at all when Vercel does not deploy. If this is ever made a
required status check, a pull request in that situation cannot be merged
without an admin bypass.

## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

```text
/
├── components.json          # Component registry/configuration
├── e2e/                     # End-to-end tests (Playwright)
├── package.json
├── public/                  # Static assets (served at site root)
├── scripts/                 # Utility scripts for development
│   └── generate-routes.ts
├── src/                     # Main source code
│   ├── content.config.ts    # Astro content configuration (https://docs.astro.build/en/guides/content-collections/)
│   ├── routes.gen.ts        # Auto-generated routes for improved type safety
│   ├── @types/              # TypeScript custom type definitions
│   ├── assets/              # Source assets (images, etc.)
│   ├── components/          # Astro/React UI components (basics are from shadcn/ui)
│   ├── content/             # Content files (e.g., markdown, data)
│   ├── generated-assets/    # Helper to automatically generate assets (og-image, marketing posts)
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Internationalization files
│   ├── layouts/             # Layout components/templates
│   ├── lib/                 # Utility libraries/helpers
│   ├── pages/               # Astro/MDX pages (routes)
│   ├── schemas/             # Content schemas
│   └── styles/              # Global and component styles
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React components.

Any static assets, like images, can be placed in the `public/` directory.
