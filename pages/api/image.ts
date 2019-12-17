import fetch from "isomorphic-unfetch";
import { parse } from "url";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.url) throw new Error("No url in request");
  const {
    query: { url }
  } = parse(req.url, true);

  if (Array.isArray(url)) {
    throw new Error(`url is an array: ${JSON.stringify(url)}`);
  }

  const r = await fetch(
    `https://www.notion.so/image/${encodeURIComponent(url)}`
  );

  res.setHeader("content-type", r.headers.get("content-type") ?? "");
  res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate");
  //@ts-ignore
  r.body.pipe(res);
};
