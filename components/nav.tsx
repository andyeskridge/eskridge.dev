import Link from "next/link";

export default () => (
  <nav>
    <Link href="/about">
      <a>About</a>
    </Link>
    <style jsx>{`
      nav {
        display: flex;
      }

      a:not(:last-child) {
        margin-right: 1em;
      }
    `}</style>
  </nav>
);
