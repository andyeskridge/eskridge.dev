import Document, { Html, Head, Main, NextScript } from "next/document";
import tw from "twin.macro";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body tw="bg-dark text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
