import cn from "classnames";
import Link from "next/link";

export default function CoverImage({
  title,
  src,
  slug = undefined,
  credit = undefined,
}) {
  const image = (
    <div className="relative">
      <img
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
        src={require(`../images/${src}?trace`).trace}
      />
      <img
        className={cn("shadow-small absolute top-0 left-0", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
        srcSet={
          require(`../images/${src}?resize&sizes[]=640&sizes[]=768&sizes[]=1024&sizes[]=1280`)
            .srcSet
        }
        sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px,"
        loading="lazy"
      />
    </div>
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
      {credit ? <span className="text-xs text-gray-600">{credit}</span> : null}
    </div>
  );
}
