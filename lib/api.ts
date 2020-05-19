import fs from "fs";
import { join } from "path";
import { parseISO, compareDesc } from "date-fns";

const DIR = join(process.cwd(), "./pages/posts/");
const files = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

export const getAllPosts = () => {
  return files
    .map((file) => {
      const META = /export\s+const\s+meta\s+=\s+(\{(\n|[^])*?\n\})/;
      const name = join(DIR, file);
      const contents = fs.readFileSync(name, "utf8");
      const match = META.exec(contents);
      if (!match || typeof match[1] !== "string")
        throw new Error(`${name} needs to export const meta = {}`);

      const meta = eval("(" + match[1] + ")");

      return {
        ...meta,
        path: "/posts/" + file.replace(/\.mdx?$/, ""),
      };
    })
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
};
