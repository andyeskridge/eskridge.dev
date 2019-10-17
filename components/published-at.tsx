import React from "react";
import Link from "next/link";
import { parse, format } from "date-fns";

function PublishedAt({ link, date }: { link: string; date: string }) {
  return (
    <>
      <Link href={link}>
        <a href={link} className="u-url">
          <time className="dt-published">
            {format(parse(date, "yyyy-MM-dd", Date.now()), "MMMM dd, yyyy")}
          </time>
        </a>
      </Link>
      <style jsx>{`
        a {
          color: #555;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}

export default PublishedAt;
