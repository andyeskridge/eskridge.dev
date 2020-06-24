import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

export default ({ children }) => {
  //I'm not sure how to get a classname out of the inline code...
  //so we're just going to assume jsx for now.
  const language = "jsx";

  return (
    <div className="inline-block">
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} relative text-center rounded-lg px-1`}
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <span key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
