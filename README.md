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

> [!WARNING]
> Because of Vercel integration, building the website locally will fail. We are using Vercel previews to check the build of the website.

## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

```text
/
├── components.json          # Component registry/configuration
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
