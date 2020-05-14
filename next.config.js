const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const optimizedImages = require("next-optimized-images");

module.exports = withMDX(
  optimizedImages({
    pageExtensions: ["ts", "tsx", "md", "mdx"],
    inlineImageLimit: 8192,
    imagesFolder: "images",
    imagesName: "[name]-[hash].[ext]",
    handleImages: ["jpeg", "jpg", "png", "svg", "webp", "gif"],
    optimizeImages: true,
    optimizeImagesInDev: true,
    mozjpeg: {
      quality: 80,
    },
    optipng: {
      optimizationLevel: 3,
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3,
    },
    svgo: {
      // enable/disable svgo plugins here
    },
    webp: {
      preset: "default",
      quality: 75,
    },
  })
);
