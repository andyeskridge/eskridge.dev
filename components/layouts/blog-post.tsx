import React from "react";
import Layout from "./default";
import SyntaxHighlight from "../syntax-highlight";

export default ({
  meta,
  children
}: {
  meta: { title: string; image: string };
  children: React.ReactNode;
}) => {
  return (
    <Layout pageTitle={meta.title} ogImage={meta.image}>
      <SyntaxHighlight />
      <article>
        <div>{children}</div>
      </article>
      <style jsx>{`
        article {
          margin-bottom: 2em;
        }
      `}</style>
    </Layout>
  );
};
