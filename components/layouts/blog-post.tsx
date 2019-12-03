import Layout from "./default";
import SyntaxHighlight from "../syntax-highlight";

export default ({ meta, children }) => {
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
