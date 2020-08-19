import { MDXProvider } from "@mdx-js/react";
import codeBlock from "./code-block";
import inlineCodeBlock from "./inline-code-block";

const components = {
  pre: (props) => <div {...props} />,
  code: codeBlock,
};

export default function PostBody({ children }) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-2xl mx-auto">
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}
