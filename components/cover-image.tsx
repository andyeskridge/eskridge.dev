import cn from "classnames";
import Link from "next/link";

export default function CoverImage({
  title,
  src,
  slug = undefined,
  credit = undefined,
}) {
  const image = (
    <img
      srcSet={require(`../images/${src}?resize`)}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
      {credit ? <span className="text-xs text-gray-500">{credit}</span> : null}
    </div>
  );
}
