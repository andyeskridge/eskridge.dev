import React from "react";
import Layout from "./default";

export default ({
  meta,
  children
}: {
  meta: { title: string };
  children: React.ReactNode;
}) => {
  return (
    <Layout pageTitle={meta.title}>
      <article>
        <header>
          <h1>{meta.title}</h1>
        </header>
        <div>{children}</div>
      </article>
      <style jsx>{`
        header {
          margin-bottom: 2em;
        }
      `}</style>
    </Layout>
  );
};
