import React from "react";

export default ({ children }: { children: React.ReactNode }) => (
  <>
    <div>{children}</div>
    <style jsx>{`
      div {
        max-width: 45rem;
        margin: 0 auto;
        padding: 0 1em;
      }
    `}</style>
  </>
);
