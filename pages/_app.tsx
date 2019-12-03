import React from "react";
import App from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "../utils";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SWRConfig
        value={{
          fetcher: fetcher
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    );
  }
}

export default MyApp;
