import fetch from "node-fetch";
import { parse } from "url";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { url }
  } = parse(req.url, true);

  if (Array.isArray(url)) {
    throw new Error(`url is an array: ${JSON.stringify(url)}`);
  }

  const r = await fetch(
    `https://www.notion.so/image/${encodeURIComponent(url)}`
  );

  res.setHeader("content-type", r.headers.get("content-type"));
  res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate");
  r.body.pipe(res);
};
