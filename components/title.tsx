import Link from "next/link";
import { siteMeta } from "../blog.config";

const Title = ({ path }: { path: string }) => (
  <>
    <p>
      <Link href="/">
        <a rel="me">{siteMeta.title}</a>
      </Link>
    </p>

    <style jsx>{`
      h1 {
        margin-top: 0;
      }

      a {
        color: #333;
        text-decoration: none;
      }

      p {
        font-size: 1.3em;
        font-weight: bold;
      }
    `}</style>
  </>
);

export default Title;
