import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "lib/constants";

export default function Meta() {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon/favicon.png" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={`A place for my thoughts.`} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
}
