import Link from "next/link";

const NextPrevPost = ({
  title,
  path,
  position
}: {
  title: string;
  path: string;
  position: "next" | "previous";
}) => {
  const isNext = position === "next";
  return (
    <>
      <Link href={path}>
        <a>
          <small>Read {position} post </small>
          {title}
        </a>
      </Link>
      <style jsx>{`
        a {
          display: flex;
          flex-direction: column;
          ${isNext ? "text-align: right;" : ""}
          ${isNext ? "grid-column: 2 / 2;" : ""}
        }
      `}</style>
    </>
  );
};

export default NextPrevPost;
