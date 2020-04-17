import React, { useEffect } from "react";
import Router from "next/router";
import { AppPropsType } from "next/dist/next-server/lib/utils";

import * as Fathom from "fathom-client";
import "../styles/tailwind.css";

// Record a pageview when route changes
Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

export default ({ Component, pageProps }: AppPropsType) => {
  // Initialize Fathom when the app loads
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load();
      Fathom.setSiteId("FNASISBH");
      Fathom.trackPageview();
    }
  }, []);
  return <Component {...pageProps} />;
};
