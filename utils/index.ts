import fetch from "isomorphic-unfetch";
import { NextApiResponse } from "next";

export async function getError(res: Response) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
}

function getJSONHeaders(res: Response) {
  return JSON.stringify(res.headers);
}

function getBodyOrNull(res: Response) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

export async function fetcher(url: string) {
  const r = await fetch(url);
  return await r.json();
}
