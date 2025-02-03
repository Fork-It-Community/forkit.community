import type { AstroIntegration } from "astro";

export default function astroDynamicImages(
  options: { basePaths?: string[] } = {},
): AstroIntegration {
  console.log(options);

  return {
    name: "astro-dynamic-images",
    hooks: {
      "astro:config:setup": ({ injectRoute, logger }) => {
        (options.basePaths ?? []).forEach((basePath) => {
          // Ensure the basePath is properly formatted
          if (!basePath.startsWith("/")) basePath = "/" + basePath;
          basePath = basePath.replace(/\/$/, ""); // Remove trailing slash

          logger.info(`************* basePath : ${basePath}`);

          injectRoute({
            pattern: `${basePath}/[__image].[__type]`,
            entrypoint: "./api-handler.ts",
          });
        });
      },
    },
  };
}
