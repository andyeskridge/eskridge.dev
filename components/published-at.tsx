import React from "react";
import { parse, format } from "date-fns";

export default ({ date }: { date: string }) => {
  return (
    <>
      <time>
        {format(parse(date, "yyyy-MM-dd", Date.now()), "MMMM dd, yyyy")}
      </time>
      <style jsx>{`
        time {
          color: #555;
        }
      `}</style>
    </>
  );
};
