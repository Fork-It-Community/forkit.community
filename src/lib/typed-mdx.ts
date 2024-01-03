import fs from "node:fs/promises";
import path from "node:path";
import z from "zod";
import matter from "gray-matter";

const CONTENT_FOLDER = "src/content";

function parseFrontmatter(fileContents: matter.Input) {
  try {
    // `matter` is empty string on cache results
    // clear cache to prevent this
    (matter as any).clearCache();
    return matter(fileContents);
  } catch (e) {
    throw e;
  }
}

async function getCollection<Z extends z.AnyZodObject>(
  name: string,
  schema: Z
) {
  const folder = path.resolve(CONTENT_FOLDER, name);
  const postFilePaths = await fs.readdir(folder);

  const mdxFiles = postFilePaths.filter(
    (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
  );

  const data = await Promise.all(
    mdxFiles.map(async (mdxFile) => {
      const filePath = path.resolve(folder, mdxFile);
      const frontmatter = parseFrontmatter(await fs.readFile(filePath));

      const result = schema.safeParse(frontmatter.data);

      if (!result.success) {
        console.group(`Errors in ${folder}/${mdxFile}`);
        Object.entries(result.error.formErrors.fieldErrors).forEach(
          ([path, errors]) => {
            console.group(`👉 Field \`${path}\``);
            errors?.forEach((error) => console.error("❌", error));
            console.groupEnd();
          }
        );
        console.groupEnd();
        return null;
      }

      return frontmatter.data;
    })
  );

  return z.array(schema).parse(data.filter(Boolean));
}

function defineCollection<Z extends z.AnyZodObject>(name: string, schema: Z) {
  return {
    getCollection: () => getCollection(name, schema),
    getItem: (slug: string) => console.log("TODO", slug),
  } as const;
}

export default defineCollection;
