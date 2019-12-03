import React from "react";
import Link from "next/link";
import { parse, format } from "date-fns";

export default ({ link, date }: { link: string; date: string }) => {
  return (
    <>
      <Link href="/post/[id]" as={link}>
        <a>
          <time>
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
};
