import React from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Layout from "../components/layouts/default";
import Post from "../components/blog-index-item";

const Home = ({ posts }) => {
  const router = useRouter();

  return (
    <Layout pageTitle="Blog" path={router.pathname}>
      <header>
        <h1>Blog</h1>
      </header>

      {posts.map((post, index) => (
        <Post
          key={index}
          title={post.value.properties.title[0][0]}
          summary={post.summary}
          date={post.value.last_edited_time}
          path={post.value.id}
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

Home.getInitialProps = async ({ req }) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";
  const res = await fetch(`${baseUrl}/api/getResults`);
  const json = await res.json();
  return { posts: json.blockIds };
};

export default Home;
