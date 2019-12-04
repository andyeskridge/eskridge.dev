import React from "react";
import { parse, format } from "date-fns";

export default ({ date }: { date: string }) => {
  return (
    <>
      <small>
        <time>
          {format(parse(date, "yyyy-MM-dd", Date.now()), "MMMM dd, yyyy")}
        </time>
      </small>
      <style jsx>{`
        time {
          color: hsla(0, 0%, 100%, 0.7);
        }

        small {
          font-size: 80%;
        }
      `}</style>
    </>
  );
};
