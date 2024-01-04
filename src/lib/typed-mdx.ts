import fs from "node:fs/promises";
import path from "node:path";
import z from "zod";
import matter from "gray-matter";
import collections from "@/content/collections";

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
    result.error.formErrors.formErrors.forEach((error) => {
      console.error("❌", error);
    });
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

async function getAll<Z extends z.AnyZodObject>({
  folder,
  schema,
}: {
  folder: string;
  schema: Z;
}) {
  const postFilePaths = await fs.readdir(path.resolve(CONTENT_FOLDER, folder));

  const mdxFileNames = postFilePaths.filter(
    (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
  );

  const data = await Promise.all(
    mdxFileNames.map(async (mdxFileName) => {
      return parseMdxFile(`${CONTENT_FOLDER}/${folder}/${mdxFileName}`, schema);
    })
  );

  return z.array(schema).parse(data.filter(Boolean));
}

async function getBySlug<Z extends z.AnyZodObject>({
  folder,
  slug,
  schema,
}: {
  folder: string;
  schema: Z;
  slug: string;
}) {
  const filePath = `${CONTENT_FOLDER}/${folder}/${slug}.mdx`;

  try {
    await fs.stat(path.resolve(filePath));
  } catch {
    throw new Error(`File ${filePath} not found`);
  }

  const data = await parseMdxFile(filePath, schema);

  // Trick to make zod infer the schema, else it doesn't infer if we do not put
  // the z.object({}) before. Maybe the generic is not small enough ?
  return z.object({}).merge(schema).parse(data);
}

export function defineCollection<Z extends z.AnyZodObject>(options: {
  folder: string;
  schema: Z;
  strict?: boolean;
}) {
  const schema =
    options.strict === false ? options.schema : options.schema.strict();
  return {
    getAll: () => getAll({ folder: options.folder, schema }),
    getBySlug: (slug: string) =>
      getBySlug({ folder: options.folder, schema, slug }),
    schema,
  } as const;
}

export type CollectionEntry<Name extends keyof typeof collections> = z.infer<
  (typeof collections)[Name]["schema"]
>;
