import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/layouts/default";
import Post from "../components/blog-index-item";
import { fetcher } from "../utils";
import useSWR from "swr";

const Home = ({ initialData }) => {
  const router = useRouter();

  const { data } = useSWR("/api/getResults", fetcher, {
    initialData
  });

  return (
    <Layout pageTitle="Blog" path={router.pathname}>
      <header>
        <h1>Blog</h1>
      </header>

      {data.blockIds.map((post, index) => (
        <Post
          key={index}
          title={post.value.properties.title[0][0]}
          summary={post.summary}
          date={post.value.properties["8Wa~"][0][1][0][1]["start_date"]}
          path={`/post/${post.value.id}`}
        />
      ))}
      <style jsx>{`
        header {
          margin-bottom: 3em;
        }
      `}</style>
    </Layout>
  );
};

Home.getInitialProps = async ({ req, res }) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";
  if (res) {
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  }
  const results = await fetcher(`${baseUrl}/api/getResults`);
  return { initialData: results };
};

export default Home;
