import Link from 'next/link'
import Header from '../components/header'

import { getBlogLink, getDateStr, postIsReady } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'

export async function unstable_getStaticProps() {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!postIsReady(post)) {
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

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [] }) => {
  return (
    <>
      <Header titlePre="Blog" />
      <div className="px-4 py-0">
        {posts.length === 0 && (
          <p className="text-center">There are no posts yet</p>
        )}
        {posts.map(post => {
          return (
            <div className="max-w-screen-sm mx-auto my-3" key={post.Slug}>
              <h3 className="text-3xl font-bold text-blue-400">
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                  <a>{post.Page}</a>
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
