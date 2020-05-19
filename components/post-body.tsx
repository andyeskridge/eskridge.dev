import { MDXProvider } from "@mdx-js/react";
import codeBlock from "./code-block";

const components = {
  p: (props) => <p className="my-6" {...props} />,
  ul: (props) => <ul className="my-6" {...props} />,
  ol: (props) => <ol className="my-6" {...props} />,
  blockquote: (props) => <blockquote className="my-6" {...props} />,
  a: (props) => <a className="underline hover:text-blue-500" {...props} />,
  h1: (props) => <h1 className="text-4xl mt-16 mb-4 leading-snug" {...props} />,
  h2: (props) => <h2 className="text-3xl mt-12 mb-4 leading-snug" {...props} />,
  h3: (props) => <h2 className="text-2xl mt-8 mb-4 leading-snug" {...props} />,
  pre: (props) => <div {...props} />,
  code: codeBlock,
};

export default function PostBody({ children }) {
  return (
    <div className="max-w-2xl mx-auto text-lg leading-relaxed">
      <MDXProvider components={components}>
        <>
          <div>{children}</div>
        </>
      </MDXProvider>
    </div>
  );
}
