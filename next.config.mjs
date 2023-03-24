// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import nextMDX from "@next/mdx";
const withLess = require("next-with-less");
const path = require("node:path");

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      [remarkFootnotes, { inlineNotes: true }],
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrismPlus, { ignoreMissing: true }],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const DwithMDX = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
});

export default DwithMDX;

const nextConfig = {
  webpack(config, options) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    return config;
  },
};

// const useLess = withLess(nextConfig);

// export { DwithMDX, useLess };

// // module.exports =
// // });

// const path = require('path')

// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// }
// module.exports = withLess(nextConfig);
