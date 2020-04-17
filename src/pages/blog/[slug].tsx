import React, { useEffect } from "react";
import Header from "../../components/header";
import Heading from "../../components/heading";
import components from "../../components/dynamic";
import ReactJSXParser from "@zeit/react-jsx-parser";
import { textBlock } from "../../lib/notion/renderers";
import getPageData from "../../lib/notion/getPageData";
import getNotionUsers from "../../lib/notion/getNotionUsers";
import getBlogIndex from "../../lib/notion/getBlogIndex";
import { getDateStr, getBlogLink } from "../../lib/blog-helpers";
import { useRouter } from "next/router";
import Link from "next/link";

// Get the data for each blog post
export async function getStaticProps({
  params: { slug },
  preview,
}: {
  params: { slug: string };
  preview: boolean;
}) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex();
  const post = postsTable[slug];

  if (!post || (post.Published !== "Yes" && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`);
    return {
      props: {
        redirect: "/blog",
        preview: false,
      },
    };
  }

  const postData = await getPageData(post.id);
  post.content = postData.blocks;

  const { users } = await getNotionUsers(post.Authors || []);
  post.Authors = Object.keys(users).map((id) => users[id].full_name);

  return {
    props: {
      post,
      preview: preview || false,
    },
  };
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getBlogIndex();
  // we fallback for any unpublished posts to save build time for actually published ones
  return {
    paths: Object.keys(postsTable)
      .filter((post) => postsTable[post].Published === "Yes")
      .map((slug) => getBlogLink(slug)),
    fallback: true,
  };
}

const listTypes = new Set(["bulleted_list", "numbered_list"]);

const RenderPost = ({ post, redirect, preview }) => {
  const router = useRouter();
  let listTagName: string | null = null;
  let listLastId: string | null = null;
  let listMap: {
    [id: string]: {
      key: string;
      isNested?: boolean;
      nested: string[];
      children: React.ReactFragment;
    };
  } = {};

  useEffect(() => {
    const twitterSrc = "https://platform.twitter.com/widgets.js";
    // make sure to initialize any new widgets loading on
    // client navigation
    if (post && post.hasTweet) {
      if ((window as any)?.twttr?.widgets) {
        (window as any).twttr.widgets.load();
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = twitterSrc;
        document.querySelector("body").appendChild(script);
      }
    }
  }, []);

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect);
    }
  }, [redirect, post]);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <div>
        <p>
          Woops! didn't find that post, redirecting you back to the blog index
        </p>
      </div>
    );
  }

  return (
    <>
      <Header titlePre={post.Page} />

      {preview && (
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-between text-center border-red-600 w-48 p-8 rounded">
            <b>Note:</b>
            {` `}Viewing in preview mode{" "}
            <Link href={`/api/clear-preview?slug=${post.Slug}`}>
              <button className="flex flex-col items-center justify-center border-none bg-black text-white h-8 rounded hover:text-black hover:bg-white">
                Exit Preview
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-screen-sm mx-auto my-0">
        <h1 className="text-3xl font-bold text-blue-400 mx-0">
          {post.Page || ""}
        </h1>
        {post.Authors.length > 0 && (
          <div className="text-sm">By: {post.Authors.join(" ")}</div>
        )}
        {post.Date && (
          <div className="text-sm">Posted: {getDateStr(post.Date)}</div>
        )}

        <hr className="my-4" />

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        {(post.content || []).map((block, blockIdx: number) => {
          const { value } = block;
          const { type, properties, id, parent_id } = value;
          const isLast = blockIdx === post.content.length - 1;
          const isList = listTypes.has(type);
          let toRender = [];

          if (isList) {
            listTagName = components[type === "bulleted_list" ? "ul" : "ol"];
            listLastId = `list${id}`;

            listMap[id] = {
              key: id,
              nested: [],
              children: textBlock(properties.title, true, id),
            };

            if (listMap[parent_id]) {
              listMap[id].isNested = true;
              listMap[parent_id].nested.push(id);
            }
          }

          if (listTagName && (isLast || !isList)) {
            toRender.push(
              React.createElement(
                listTagName,
                { key: listLastId! },
                Object.keys(listMap).map((itemId) => {
                  if (listMap[itemId].isNested) return null;

                  const createEl = (item) =>
                    React.createElement(
                      components.li || "ul",
                      { key: item.key },
                      item.children,
                      item.nested.length > 0
                        ? React.createElement(
                            components.ul || "ul",
                            { key: item + "sub-list" },
                            item.nested.map((nestedId) =>
                              createEl(listMap[nestedId])
                            )
                          )
                        : null
                    );
                  return createEl(listMap[itemId]);
                })
              )
            );
            listMap = {};
            listLastId = null;
            listTagName = null;
          }

          const renderHeading = (Type: string | React.ComponentType) => {
            toRender.push(
              <Heading key={id}>
                <Type key={id}>{textBlock(properties.title, true, id)}</Type>
              </Heading>
            );
          };

          switch (type) {
            case "page":
            case "divider":
              break;
            case "text":
              if (properties) {
                toRender.push(textBlock(properties.title, false, id));
              }
              break;
            case "image":
            case "video": {
              const { format = {} } = value;
              const { block_width } = format;
              const baseBlockWidth = 768;
              const roundFactor = Math.pow(10, 2);
              // calculate percentages
              const width = block_width
                ? `${
                    Math.round(
                      (block_width / baseBlockWidth) * 100 * roundFactor
                    ) / roundFactor
                  }%`
                : "100%";

              const isImage = type === "image";
              const Comp = isImage ? "img" : "video";

              toRender.push(
                <Comp
                  key={id}
                  src={`/api/asset?assetUrl=${encodeURIComponent(
                    format.display_source as any
                  )}&blockId=${id}`}
                  controls={!isImage}
                  alt={isImage ? "An image from Notion" : undefined}
                  loop={!isImage}
                  muted={!isImage}
                  autoPlay={!isImage}
                  style={{ width }}
                  className="mx-8 my-auto shadow-md max-w-full block"
                />
              );
              break;
            }
            case "header":
              renderHeading("h1");
              break;
            case "sub_header":
              renderHeading("h2");
              break;
            case "sub_sub_header":
              renderHeading("h3");
              break;
            case "code": {
              if (properties.title) {
                const content = properties.title[0][0];
                const language = properties.language[0][0];

                if (language === "LiveScript") {
                  // this requires the DOM for now
                  toRender.push(
                    <ReactJSXParser
                      key={id}
                      jsx={content}
                      components={components}
                      componentsOnly={false}
                      renderInpost={false}
                      allowUnknownElements={true}
                      blacklistedTags={["script", "style"]}
                    />
                  );
                } else {
                  toRender.push(
                    <components.Code key={id} language={language || ""}>
                      {content}
                    </components.Code>
                  );
                }
              }
              break;
            }
            case "quote":
              if (properties.title) {
                toRender.push(
                  React.createElement(
                    components.blockquote,
                    { key: id },
                    properties.title
                  )
                );
              }
              break;
            default:
              if (
                process.env.NODE_ENV !== "production" &&
                !listTypes.has(type)
              ) {
                console.log("unknown type", type);
              }
              break;
          }
          return toRender;
        })}
      </div>
    </>
  );
};

export default RenderPost;
