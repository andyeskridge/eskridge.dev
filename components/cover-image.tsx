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
          require(`../images/${src}?resize&sizes[]=600&sizes[]=728&sizes[]=984&sizes[]=1240`)
            .srcSet
        }
        sizes="(max-width: 640px) 600px, (max-width: 768px) 728px, (max-width: 1024px) 984px, 1240px,"
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
