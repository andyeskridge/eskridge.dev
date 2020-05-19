import cn from "classnames";
import Link from "next/link";

export default function CoverImage({
  title,
  src,
  small = false,
  slug = undefined,
  credit = undefined,
}) {
  const srcSet = small
    ? require(`images/${src}?resize&sizes[]=640&sizes[]=332&sizes[]=428&sizes[]=556`)
    : require(`images/${src}?resize&sizes[]=600&sizes[]=728&sizes[]=984&sizes[]=1240`);
  const sizes = small
    ? "(max-width: 640px) 640px, (max-width: 768px) 600px, (max-width: 1024px) 332px, (max-width: 1280px) 428px, 556px"
    : "(max-width: 640px) 600px, (max-width: 768px) 728px, (max-width: 1024px) 984px, 1240px";
  const image = (
    <div className="relative">
      <img
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
        src={require(`images/${src}?trace`).trace}
        alt={`SVG trace of ${title}`}
      />
      <img
        className={cn("shadow-small absolute top-0 left-0", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
        srcSet={srcSet.srcSet}
        sizes={sizes}
        loading="lazy"
        alt={title}
      />
    </div>
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
      {credit ? <span className="text-xs text-gray-600">{credit}</span> : null}
    </div>
  );
}
