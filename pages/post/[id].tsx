import React from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/blog-post";

const Post = ({ sections, meta }) => {
  return (
    <Layout meta={meta}>
      {sections.map((section, i) => {
        return (
          <section
            key={`section-${i}`}
            className={i === 0 ? "intro" : ""}
            id={i === 1 ? "first" : ""}
          >
            <header>
              {i === 0 ? (
                <>
                  <h1>{renderText(section.title)}</h1>
                </>
              ) : (
                <h2>{renderText(section.title)}</h2>
              )}
            </header>
            <div className="content">
              {section.children.map(subsection => {
                return subsection.type === "image" ? (
                  <span className={`image ${i === 0 ? "fill" : "main"}`}>
                    <NotionImage src={subsection.src} />
                  </span>
                ) : subsection.type === "text" ? (
                  <p>{renderText(subsection.value)}</p>
                ) : subsection.type === "list" ? (
                  <ul>
                    {subsection.children.map(child => (
                      <li>{renderText(child)}</li>
                    ))}
                  </ul>
                ) : null;
              })}
            </div>
          </section>
        );
      })}
      <style jsx>{`
        header {
          margin-bottom: 3em;
        }
      `}</style>
    </Layout>
  );
};

function renderText(title) {
  return title.map(chunk => {
    let wrapper = <span>{chunk[0]}</span>;
    (chunk[1] || []).forEach(el => {
      wrapper = React.createElement(el[0], {}, wrapper);
    });

    return wrapper;
  });
}

function NotionImage({ src }) {
  if (src) {
    return <img title="image" src={src} />;
  } else {
    return <div />;
  }
}

Post.getInitialProps = async ({ req, query }) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";
  const { id } = query;
  const res = await fetch(`${baseUrl}/api/getNotionData/${id}`);
  const { sections, meta } = await res.json();
  return { sections, meta };
};

export default Post;
