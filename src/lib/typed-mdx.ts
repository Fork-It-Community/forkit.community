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

async function parseMdxFile(mdxPath: string, schema: z.AnyZodObject) {
  const filePath = path.resolve(mdxPath);
  const frontmatter = parseFrontmatter(await fs.readFile(filePath));

  const result = schema.safeParse(frontmatter.data);

  if (!result.success) {
    console.group(`Errors in ${mdxPath}`);
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
}

async function getAll<Z extends z.AnyZodObject>(name: string, schema: Z) {
  const folder = path.resolve(CONTENT_FOLDER, name);
  const postFilePaths = await fs.readdir(folder);

  const mdxFiles = postFilePaths.filter(
    (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
  );

  const data = await Promise.all(
    mdxFiles.map(async (mdxFile) => {
      return parseMdxFile(`${folder}/${mdxFile}`, schema);
    })
  );

  return z.array(schema).parse(data.filter(Boolean));
}

async function getBySlug<Z extends z.AnyZodObject>(
  name: string,
  schema: Z,
  slug: string
) {
  const folder = path.resolve(CONTENT_FOLDER, name);
  const mdxFile = path.extname(slug).toLowerCase() === ".mdx";

  const data = await parseMdxFile(`${folder}/${mdxFile}`, schema);

  if (!data) {
    throw new Error("File not found");
  }

  return schema.parse(data);
}

export function defineCollection<Z extends z.AnyZodObject>(
  name: string,
  schema: Z
) {
  return {
    getAll: () => getAll(name, schema),
    getBySlug: (slug: string) => getBySlug(name, schema, slug),
  } as const;
}
