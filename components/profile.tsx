import { siteMeta } from "../blog.config";

const Profile = (_props: any) => (
  <div className="h-card profile">
    <img
      className="u-photo"
      src="https://secure.gravatar.com/avatar/b45bac1be8f44eace03ebb95145f93b4"
      alt={siteMeta.author}
    />

    <div>
      <p>
        Hi, I'm{" "}
        <a className="u-url p-name" href={siteMeta.siteUrl} rel="me">
          {siteMeta.author}
        </a>
      </p>
      <p className="p-note">
        I'm an experienced development manager. Currently managing development
        efforts at Cenergistic.
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
        width: 5em;
        height: 5em;
        margin-right: 0.5em;
      }

      p:last-child {
        margin-bottom: 0;
      }
    `}</style>
  </div>
);

export default Profile;
