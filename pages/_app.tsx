import '../styles/index.css'
import { AppProps } from 'next/app'
import React, { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let firstScript = window.document.getElementsByTagName("script")[0];

    let preconnect = window.document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://ecoonll.eskridge.dev";
    firstScript.parentNode?.insertBefore(preconnect, firstScript);

    let tracker = window.document.createElement("script");
    tracker.defer = true;
    tracker.setAttribute("site", "FNASISBH");
    tracker.setAttribute("spa", "auto");
    tracker.src = "https://ecoonll.eskridge.dev/script.js";
    firstScript.parentNode?.insertBefore(tracker, firstScript);
  }, []);
  return <Component {...pageProps} />;
}
