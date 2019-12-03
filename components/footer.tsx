import Profile from "./profile";

export default () => {
  return (
    <footer>
      <Profile />

      <p>
        Proudly built with <a href="https://nextjs.org">Next.js</a> -{" "}
        <a href="/feed.json">RSS Feed</a>
      </p>
      <style jsx>{`
        footer {
          padding: 1em 0;
        }

        p {
          margin-top: 2em;
        }
      `}</style>
    </footer>
  );
};
