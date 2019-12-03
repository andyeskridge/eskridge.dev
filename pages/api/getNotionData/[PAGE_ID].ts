import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import { loadPageChunk } from "../loadPageChunk";
import { queryCollection } from "../queryCollection";

type Block = {
  title: [[string]];
  children: {
    type: "text" | "code" | "image" | "list";
    value: [[string]];
    lang?: [[string]];
    src?: [[string]];
    children?: string[];
  }[];
};

export type GetPageType = {
  sections: Block[];
  meta: {};
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl = process.env.DEV
    ? "http://localhost:3000"
    : req
    ? `https://${req.headers.host}`
    : "";

  const {
    query: { PAGE_ID }
  } = req;

  const results = await loadPageChunk({ pageId: PAGE_ID });
  const data = await results.json();
  const blocks = values(data.recordMap.block);

  const sections = [];
  let meta = {};

  for (const block of blocks) {
    const value = block.value;
    //filter out blocks that are not the current page or a child of the current page.
    //TODO: this won't work if the children are more than one level deep. Need to build
    //a better heirarchy for filtering them out
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
    } else if (value.type === "code") {
      list = null;
      if (value.properties) {
        section.children.push({
          type: "code",
          value: value.properties.title,
          lang: value.properties.language
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
      const colRes = await queryCollection(
        value.collection_id,
        value.view_ids[0],
        {},
        {}
      );
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
  res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate");
  res.json({ sections, meta });
};

function values(obj) {
  const vals = [];
  for (const key in obj) {
    vals.push(obj[key]);
  }
  return vals;
}
