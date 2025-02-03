import type { APIRoute, GetStaticPathsOptions } from "astro";

export async function apiImageGenerator({
  modules,
}: {
  modules: Record<string, unknown>;
}) {
  const files = Object.entries(modules);

  console.log("FILES", files);

  const contents = await Promise.all(
    files.map(async ([path, file]) => {
      const fileName = path
        .split("/")
        .at(-1)
        ?.replace(/\.tsx$/, "")
        .replace(/^_/, "");

      const content = file as any;
      return {
        methods: content.default({ __image: fileName }),
        fileName,
      };
    }),
  );

  const getStaticPaths = async (options: GetStaticPathsOptions) => {
    return (
      await Promise.all(
        contents.map(
          async (content) => await content.methods.getStaticPaths(options),
        ),
      )
    ).flat(Infinity);
  };
  const GET: APIRoute = (options) => {
    const { params } = options;
    return contents
      .find((content) => content.fileName === params.__image)
      ?.methods.GET(options);
  };

  return { getStaticPaths, GET };
}
