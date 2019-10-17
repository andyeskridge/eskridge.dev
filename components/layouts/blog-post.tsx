import Layout from "./default";
import SyntaxHighlight from "../syntax-highlight";

function BlogPost({ meta, children }) {
  return (
    <Layout pageTitle={meta.title} ogImage={meta.image}>
      <SyntaxHighlight />
      <article className="h-entry">
        <div className="e-content">{children}</div>
      </article>
      <style jsx>{`
        article {
          margin-bottom: 2em;
        }
      `}</style>
    </Layout>
  );
}

export default BlogPost;
