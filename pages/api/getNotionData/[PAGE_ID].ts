import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";

  const {
    query: { PAGE_ID }
  } = req;

  const results = await fetch(`${baseUrl}/api/loadPageChunk`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ pageId: PAGE_ID })
  });
  const data = await results.json();
  console.log(JSON.stringify(data, null, 2));
  const blocks = values(data.recordMap.block);

  const sections = [];
  let meta = {};

  for (const block of blocks) {
    const value = block.value;
    if (block.value.id !== PAGE_ID && block.value.parent_id !== PAGE_ID)
      continue;
    if (
      value.type === "page" ||
      value.type === "header" ||
      value.type === "sub_header"
    ) {
      sections.push({ title: value.properties.title, children: [] });
      continue;
    }

    const section = sections[sections.length - 1];
    let list = null;

    if (value.type === "image") {
      list = null;
      const child = {
        type: "image",
        src: `${baseUrl}/api/image?url=${encodeURIComponent(
          value.format.display_source
        )}`
      };
      section.children.push(child);
    } else if (value.type === "text") {
      list = null;
      if (value.properties) {
        section.children.push({
          type: "text",
          value: value.properties.title
        });
      }
    } else if (value.type === "bulleted_list") {
      if (list == null) {
        list = {
          type: "list",
          children: []
        };
        section.children.push(list);
      }
      list.children.push(value.properties.title);
    } else if (value.type === "collection_view") {
      const colRes = await fetch(`${baseUrl}/api/queryCollection`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          collectionId: value.collection_id,
          collectionViewId: value.view_ids[0]
        })
      });
      const col = await colRes.json();
      const table = {};
      const entries = values(col.recordMap.block).filter(
        block => block.value && block.value.parent_id === value.collection_id
      );
      for (const entry of entries) {
        const props = entry.value.properties;

        // I wonder what `Agd&` is? it seems to be a fixed property
        // name that refers to the value
        table[
          props.title[0][0]
            .toLowerCase()
            .trim()
            .replace(/[ -_]+/, "_")
        ] = props["Agd&"];
      }
      if (sections.length === 1) {
        meta = table;
      } else {
        section.children.push({
          type: "table",
          value: table
        });
      }
    } else {
      list = null;
      console.log("UNHANDLED", value);
    }
  }

  res.json({ sections, meta });
};

function values(obj) {
  const vals = [];
  for (const key in obj) {
    vals.push(obj[key]);
  }
  return vals;
}
