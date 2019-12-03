import React from "react";
import NextHead from "next/head";
import { siteMeta } from "../blog.config";

const defaultDescription = siteMeta.description;
const defaultOGURL = siteMeta.siteUrl;
const defaultOGImage = siteMeta.image;

export default ({
  title = undefined,
  description = defaultDescription,
  url = defaultOGURL,
  ogImage = defaultOGImage
}: {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title ? `${title} - ${siteMeta.title}` : siteMeta.title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />

    <link
      rel="alternate"
      title="RSS Feed"
      type="application/json"
      href={`${siteMeta.siteUrl}/feed.json`}
    />

    <meta property="og:url" content={url} />
    <meta property="og:title" content={title || ""} />
    <meta property="og:description" content={description} />
    <meta name="twitter:site" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={`${siteMeta.siteUrl}${ogImage}`} />
    <meta property="og:image" content={`${siteMeta.siteUrl}${ogImage}`} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);
