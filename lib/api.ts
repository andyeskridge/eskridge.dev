import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import PostType from "../types/post";
import { compareDesc, parseISO } from "date-fns";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: (keyof PostType)[] = []): PostType {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: PostType = {
    slug: "",
    author: { name: "", picture: "" },
    content: "",
    coverImage: "",
    date: "",
    excerpt: "",
    ogImage: { url: "" },
    title: "",
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items.slug = realSlug;
    }
    if (field === "content") {
      items.content = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: (keyof PostType)[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
  return posts;
}
