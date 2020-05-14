import markdownStyles from "./markdown-styles.module.css";

export default function PostBody({ children }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles["markdown"]}>{children}</div>
    </div>
  );
}
