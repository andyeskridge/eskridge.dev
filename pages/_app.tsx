import React, { useEffect } from "react";
import "styles/index.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let tracker = window.document.createElement("script");
    let firstScript = window.document.getElementsByTagName("script")[0];
    tracker.defer = true;
    tracker.setAttribute("site", "FNASISBH");
    tracker.setAttribute("spa", "auto");
    tracker.src = "https://ecoonll.eskridge.dev/script.js";
    firstScript.parentNode.insertBefore(tracker, firstScript);
  }, []);
  return <Component {...pageProps} />;
}
