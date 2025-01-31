import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { APIRoute, GetStaticPathsOptions } from "astro";

const __filename = fileURLToPath(import.meta.url);

const result = await fs.readdir(path.resolve(path.dirname(__filename)));

const tsxFiles = result.filter((file) => file.endsWith(".tsx"));

const contents = await Promise.all(
  tsxFiles.map(async (file) => {
    const fileName = file.replace(/\.tsx$/, "").replace(/^_/, "");
    const content = await import(`./_${fileName}.tsx`);

    return {
      methods: content.default({ __image: fileName }),
      fileName,
    };
  }),
);

// dynamic import pour le rendu et la "collection"
// map pour pour générer les routes et composants

export const getStaticPaths = async (options: GetStaticPathsOptions) => {
  return (
    await Promise.all(
      contents.map(
        async (content) => await content.methods.getStaticPaths(options),
      ),
    )
  ).flat(Infinity);
};
export const GET: APIRoute = (options) => {
  const { params } = options;

  return contents
    .find((content) => content.fileName === params.__image)
    ?.methods.GET(options);
};
