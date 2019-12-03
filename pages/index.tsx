import React from "react";
import Layout from "../components/layouts/default";
import Post from "../components/blog-index-item";
import { fetcher } from "../utils";
import useSWR from "swr";
import { GetResultsType } from "./api/getResults";

const Home = ({ initialData }: { initialData: GetResultsType }) => {
  const { data } = useSWR<GetResultsType>("/api/getResults", {
    initialData
  });

  return (
    <Layout pageTitle="Blog">
      <header>
        <h1>Blog</h1>
      </header>

      {data.blockIds.map((post, index) => (
        <Post
          key={index}
          title={post.value.properties.title[0][0]}
          summary={post.value.properties["ct`>"]?.[0]?.[0]}
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

  res?.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const results: GetResultsType = await fetcher(`${baseUrl}/api/getResults`);
  return { initialData: results };
};

export default Home;
