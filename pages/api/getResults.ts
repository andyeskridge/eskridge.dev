import { NextApiRequest, NextApiResponse } from "next";
import { queryCollection } from "./queryCollection";

export type GetResultsType = {
  blockIds: {
    role: "reader";
    value: {
      id: string;
      version: number;
      type: "page";
      properties: {
        "8Wa~": [["‣", [["d", { type: "date"; start_date: string }]]]];
        title: [[string]];
        "ct`>"?: [[string]];
        [key: string]: any;
      };
      content: string[];
      created_by: string;
      created_time: number;
      last_edited_by: string;
      last_edited_time: number;
      parent_id: string;
      parent_table: "collection";
      alive: boolean;
      created_by_table: "notion_user";
      created_by_id: string;
      last_edited_by_table: "notion_user";
      last_edited_by_id: string;
    };
  }[];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: {
      collectionId = "c04ef1f8-2617-4248-bfec-f495db357b0f",
      collectionViewId = "27271deb-b714-4373-a4be-7ac73c5670ec",
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
  res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate");
  res.json({ blockIds });
};
