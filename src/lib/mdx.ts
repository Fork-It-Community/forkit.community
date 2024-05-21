import { Result } from "@swan-io/boxed";

/**
 * Safe way to import the mdx.
 */
export async function getMDXContent(
  /**
   * Should be the `import()` function with the path.
   * We can't use the import function in this util as the compiler want
   * hardcoded string when calling it. It won't work it the string is not in the
   * import function.
   */
  imported: Promise<any>,
): Promise<Result<any, string>> {
  try {
    return Result.Ok((await imported).default);
  } catch {
    return Result.Error(
      "Can't load MDX content, check the filename and given path if you are sure you want to load it",
    );
  }
}
