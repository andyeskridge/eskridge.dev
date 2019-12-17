import React from "react";
import Layout from "../../components/layouts/blog-post";
import { fetcher } from "../../utils";
import useSWR from "swr";
import { useRouter } from "next/router";
import { GetPageType } from "../api/getNotionData/[PAGE_ID]";
import { NextApiRequest, NextApiResponse } from "next";

const Post = ({ initialData }: { initialData: GetPageType }) => {
  const router = useRouter();
  const { data } = useSWR<GetPageType>(
    `/api/getNotionData/${router.query.id}`,
    {
      initialData
    }
  );
  if (!data) return <div>Loading</div>;
  const { sections, meta } = data;
  return (
    <Layout meta={meta}>
      {sections.map((section: { title: any; children: any[] }, i: number) => {
        return (
          <section
            key={`section-${i}`}
            className={i === 0 ? "intro" : ""}
            id={i === 1 ? "first" : ""}
          >
            <header>
              {i === 0 ? (
                <h1>{renderText(section.title)}</h1>
              ) : (
                <h2>{renderText(section.title)}</h2>
              )}
            </header>
            <div className="content">
              {section.children.map(
                (
                  subsection: {
                    type: string;
                    src: any;
                    value: any;
                    children: any[];
                  },
                  j: any
                ) => {
                  return subsection.type === "image" ? (
                    <span
                      key={`subsection-${j}`}
                      className={`image ${i === 0 ? "fill" : "main"}`}
                    >
                      <NotionImage src={subsection.src} />
                    </span>
                  ) : subsection.type === "text" ? (
                    <p key={`subsection-${j}`}>
                      {renderText(subsection.value)}
                    </p>
                  ) : subsection.type === "list" ? (
                    <ul key={`subsection-${j}`}>
                      {subsection.children.map((child: any) => (
                        <li>{renderText(child)}</li>
                      ))}
                    </ul>
                  ) : subsection.type === "code" ? (
                    <code key={`subsection-${j}`}>
                      {renderText(subsection.value)}
                    </code>
                  ) : null;
                }
              )}
            </div>
          </section>
        );
      })}
    </Layout>
  );
};

function renderText(title: any[]) {
  return title.map((chunk: any[], i: string | number | undefined) => {
    let wrapper = <span key={i}>{chunk[0]}</span>;
    (chunk[1] || []).forEach((el: any[]) => {
      wrapper = React.createElement(el[0], {}, wrapper);
    });

    return wrapper;
  });
}

function NotionImage({ src }: { src: string | undefined }) {
  if (src) {
    return <img title="image" src={src} />;
  } else {
    return <div />;
  }
}

Post.getInitialProps = async ({
  req,
  res,
  query
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: { id: string };
}) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";

  res?.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const { id } = query;
  const results: GetPageType = await fetcher(
    `${baseUrl}/api/getNotionData/${id}`
  );
  return { initialData: results };
};

export default Post;
