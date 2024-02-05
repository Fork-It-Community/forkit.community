// Only support ESM so next.config.mjs
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // To remove frontmatter from rendering
      remarkFrontmatter,
      // To put frontmatter as export IN MDX
      remarkMdxFrontmatter,
    ],
  },
});

export default withMDX(nextConfig);
