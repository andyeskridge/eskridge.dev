import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

import { getError } from "../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body == null) {
      return res.status(400).send({ error: "no JSON object in the request" });
    }

    const {
      body: {
        pageId,
        limit = 100,
        cursor = { stack: [] },
        chunkNumber = 0,
        verticalColumns = false
      }
    } = req;

    const body = {
      pageId,
      limit,
      cursor,
      chunkNumber,
      verticalColumns
    };

    const r = await fetch(`https://www.notion.so/api/v3/loadPageChunk`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (r.ok) {
      res.setHeader("content-type", r.headers.get("content-type"));
      res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate");
      //@ts-ignore
      r.body.pipeTo(res);
    } else {
      throw new Error(await getError(r));
    }
  } else {
    res.status(405).send({ error: "only POST requests are accepted" });
  }
};
