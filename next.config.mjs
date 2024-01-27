// Only support ESM so next.config.mjs
import remarkFrontmatter from "remark-frontmatter";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // To remove frontmatter from rendering
    remarkPlugins: [remarkFrontmatter],
  },
});

export default withMDX(nextConfig);
