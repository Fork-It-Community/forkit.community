import fs from "node:fs/promises";
import path from "node:path";
import z from "zod";
import matter from "gray-matter";

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

export async function getAll<Z extends z.AnyZodObject>(
  name: string,
  schema: Z
) {
  const postFilePaths = await fs.readdir(path.resolve("content", name));

  const mdxFiles = postFilePaths.filter(
    (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
  );

  const mdxFilesPaths = mdxFiles.map((mdxFile) =>
    path.resolve("content", name, mdxFile)
  );

  const frontmatters = await Promise.all(
    mdxFilesPaths.map(async (filePath) => ({
      frontmatter: parseFrontmatter(await fs.readFile(filePath)),
      file: filePath,
    }))
  );

  const data = frontmatters
    .filter((f) => {
      const result = schema.safeParse(f.frontmatter.data);

      if (!result.success) {
        console.error(f.file);
        console.error(result.error.errors);
      }

      return result.success;
    })
    .map((content) => content.frontmatter.data);

  return z.array(schema).parse(data);
}
