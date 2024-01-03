import fs from "node:fs/promises";
import path from "node:path";
import z from "zod";
import matter from "gray-matter";

const CONTENT_FOLDER = "src/content";

/** Method to get the frontmatter as a JavaScript object */
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
  const file = `${folder}/${slug}.mdx`;

  try {
    await fs.stat(file);
  } catch {
    throw new Error(`File ${file} not found`);
  }

  const data = await parseMdxFile(file, schema);

  // Trick to make zod infer the schema, else it doesn't infer if we do not put
  // the z.object({}) before. Maybe the generic is not small enough ?
  return z.object({}).merge(schema).parse(data);
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
