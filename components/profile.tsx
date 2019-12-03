import { siteMeta } from "../blog.config";

export default () => (
  <div className="profile">
    <img
      src="https://secure.gravatar.com/avatar/b45bac1be8f44eace03ebb95145f93b4"
      alt={siteMeta.author}
    />

    <div>
      <p>
        Hi, I'm{" "}
        <a href={siteMeta.siteUrl} rel="me">
          {siteMeta.author}
        </a>
      </p>
      <p>
        {`I'm an experienced development manager. Currently managing development efforts at Cenergistic.`}
      </p>
    </div>
    <style jsx>{`
      .profile {
        display: flex;
        align-items: center;
        padding: 1em;
        background-color: #eee;
      }

      img {
        width: 75px;
        height: 75px;
        margin-right: 0.5em;
      }

      p:last-child {
        margin-bottom: 0;
      }
    `}</style>
  </div>
);
