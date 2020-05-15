//https://masteringnextjs.com/sitemap-robots
const fs = require("fs");

const globby = require("globby");

(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    "pages/**/*{.tsx,.mdx}",
    "!pages/_*.tsx",
    "!pages/api",
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "");
                const route = path === "/index" ? "" : path;

                return `
                        <url>
                            <loc>${`https://eskridge.dev${route}`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
