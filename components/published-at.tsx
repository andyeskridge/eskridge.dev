import React from "react";
import Link from "next/link";
import { parse, format, fromUnixTime } from "date-fns";

function PublishedAt({ link, date }: { link: string; date: number }) {
  return (
    <>
      <Link href={link}>
        <a href={link} className="u-url">
          <time className="dt-published">{date}</time>
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
