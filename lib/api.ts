import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export interface Post {
  slug?: string;
  content?: string;
  title?: string;
  date?: string;
  author?: { name: string; picture: string };
  ogImage?: { url: string };
  coverImage?: { url: string; credit: string };
  excerpt?: string;
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: (keyof Post)[]) {
  const slugs = getPostSlugs();
  return slugs
    .filter((slug) => slug.endsWith(".md"))
    .map((slug) => getPostBySlug(slug, fields));
}
