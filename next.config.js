const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const optimizedImages = require("next-optimized-images");

module.exports = withMDX(
  optimizedImages({
    pageExtensions: ["ts", "tsx", "md", "mdx"],
  })
);
