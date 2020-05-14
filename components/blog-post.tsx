import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "./container";
import PostBody from "./post-body";
import Header from "./header";
import PostHeader from "./post-header";
import Layout from "./layout";
import PostTitle from "./post-title";
import Head from "next/head";

type PostMetaData = {
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  author: string;
};
type Props = {
  meta: PostMetaData;
  children: React.ReactChildren;
  preview: boolean;
};

export default function BlogPost(props: Props) {
  const { meta, children, preview } = props;
  const router = useRouter();
  if (!router.isFallback && !meta.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{meta.title} | eskridge.dev</title>
                {/* <meta property="og:image" content={meta.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={meta.title}
                coverImage={meta.coverImage}
                date={meta.date}
                author={meta.author}
              />
              <PostBody>{children}</PostBody>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}
