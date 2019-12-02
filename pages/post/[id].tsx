import React from "react";
import Layout from "../../components/layouts/blog-post";
import { fetcher } from "../../utils";
import useSWR from "swr";
import { useRouter } from "next/router";

const Post = ({ initialData, query }) => {
  const router = useRouter();
  const { data } = useSWR(`/api/getNotionData/${router.query.id}`, fetcher, {
    initialData
  });
  const { sections, meta } = data;
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
              {section.children.map((subsection, j) => {
                return subsection.type === "image" ? (
                  <span
                    key={`subsection-${j}`}
                    className={`image ${i === 0 ? "fill" : "main"}`}
                  >
                    <NotionImage src={subsection.src} />
                  </span>
                ) : subsection.type === "text" ? (
                  <p key={`subsection-${j}`}>{renderText(subsection.value)}</p>
                ) : subsection.type === "list" ? (
                  <ul key={`subsection-${j}`}>
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
  return title.map((chunk, i) => {
    let wrapper = <span key={i}>{chunk[0]}</span>;
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

Post.getInitialProps = async ({ req, res, query }) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";
  if (res) {
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  }
  const { id } = query;
  const results = await fetcher(`${baseUrl}/api/getNotionData/${id}`);
  return { initialData: results };
};

export default Post;
