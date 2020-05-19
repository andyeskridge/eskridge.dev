const withPlugins = require("next-compose-plugins");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    withMDX,
    [
      optimizedImages,
      { responsive: { adapter: require("responsive-loader/sharp") } },
    ],
  ],
  {
    pageExtensions: ["ts", "tsx", "md", "mdx"],
    webpack: (config, { isServer }) => {
      if (isServer) {
        require("./lib/generate-sitemap");
      }

      return config;
    },
  }
);
