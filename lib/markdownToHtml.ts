import markdown from "remark-parse";
import unified from "unified";
import remarkrehype from "remark-rehype";
import html from "rehype-stringify";

export default async function markdownToHtml(md) {
  const result = await unified()
    .use(markdown)
    .use(remarkrehype)
    .use(html)
    .process(md);
  return result.toString();
}
