import { NextApiRequest, NextApiResponse } from "next";
import { queryCollection } from "./queryCollection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: {
      collectionId = "c04ef1f8-2617-4248-bfec-f495db357b0f",
      collectionViewId = "3ecee699-c9ca-45cc-a79a-7a376df75e3a",
      loader = {},
      query = {}
    }
  } = req;
  const results = await queryCollection(
    collectionId,
    collectionViewId,
    loader,
    query
  );
  const col = await results.json();
  const blockIds = [];
  const entries = col.recordMap.block;
  for (const key in entries) {
    if (entries.hasOwnProperty(key)) {
      const block = entries[key];
      if (col.result.blockIds.includes(key)) {
        blockIds.push(block);
      }
    }
  }
  res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate");
  res.json({ blockIds });
};
