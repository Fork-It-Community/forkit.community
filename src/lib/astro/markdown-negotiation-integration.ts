import type { AstroIntegration } from "astro";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

type VercelRoute = Record<string, unknown>;

const MARKDOWN_NEGOTIATION_ROUTES: VercelRoute[] = [
  {
    src: "^/events/([^/]+)$",
    has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    dest: "/events/$1.html.md",
  },
  {
    src: "^/people/([^/]+)$",
    has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    dest: "/people/$1.html.md",
  },
  {
    src: "^/news/article/([^/]+)$",
    has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    dest: "/news/article/$1.html.md",
  },
  {
    src: "^/podcasts/([^/]+)/episodes/([^/]+)$",
    has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    dest: "/podcasts/$1/episodes/$2.html.md",
  },
];

export const markdownNegotiation = (): AstroIntegration => ({
  name: "markdown-negotiation",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      const candidates = [
        new URL("../.vercel/output/config.json", dir),
        new URL("../../.vercel/output/config.json", dir),
        new URL("./.vercel/output/config.json", dir),
      ];
      const configPath = candidates
        .map((url) => fileURLToPath(url))
        .find((path) => existsSync(path));

      if (!configPath) {
        logger.warn(
          `Skipping markdown negotiation injection: .vercel/output/config.json not found near ${fileURLToPath(dir)}`,
        );
        return;
      }

      const raw = await readFile(configPath, "utf-8");
      const config = JSON.parse(raw) as { routes?: VercelRoute[] };
      const routes = config.routes ?? [];

      const filesystemIndex = routes.findIndex(
        (route) => route.handle === "filesystem",
      );
      const insertionIndex = filesystemIndex === -1 ? 0 : filesystemIndex;

      routes.splice(insertionIndex, 0, ...MARKDOWN_NEGOTIATION_ROUTES);
      config.routes = routes;

      await writeFile(configPath, JSON.stringify(config, null, 2));
      logger.info(
        `Injected ${MARKDOWN_NEGOTIATION_ROUTES.length} markdown negotiation routes before filesystem.`,
      );
    },
  },
});
