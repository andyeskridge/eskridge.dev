import Link from "next/link";
import PublishedAt from "./published-at";

export default ({
  title,
  summary,
  date,
  path
}: {
  title: string;
  summary: string;
  date: string;
  path: string;
}) => (
  <article>
    <header>
      <h2>
        <Link href="/post/[id]" as={path}>
          <a>{title}</a>
        </Link>
      </h2>

      <PublishedAt date={date} />
    </header>
    <div className="post-summary">{summary}</div>
    <style jsx>{`
      article {
        margin-bottom: 2em;
      }

      a {
        text-decoration: none;
      }

      .post-summary {
        margin-top: 1em;
      }
    `}</style>
  </article>
);
