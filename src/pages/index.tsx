import Link from 'next/link'
import Header from '../components/header'

import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      posts,
      preview: preview || false,
    },
    revalidate: 10,
  }
}

export default ({ posts = [], preview }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-between text-center border-red-600 w-48 p-8 rounded">
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className="flex flex-col items-center justify-center border-none bg-black text-white h-8 rounded hover:text-black hover:bg-white">
                Exit Preview
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="px-4 py-0">
        {posts.length === 0 && (
          <p className="text-center">There are no posts yet</p>
        )}
        {posts.map((post) => {
          return (
            <div className="max-w-screen-sm mx-auto my-3" key={post.Slug}>
              <h3 className="text-3xl font-bold text-blue-400 cursor-pointer">
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                  <div className="inline-flex items-center justify-start">
                    {!post.Published && (
                      <span className="rounded-md bg-black text-white pl-2 pr-8 mr-5">
                        Draft
                      </span>
                    )}
                    <a>{post.Page}</a>
                  </div>
                </Link>
              </h3>
              {post.Authors.length > 0 && (
                <div className="text-sm">By: {post.Authors.join(' ')}</div>
              )}
              {post.Date && (
                <div className="text-sm">Posted: {getDateStr(post.Date)}</div>
              )}
              <p className="mt-3">
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
