import React from "react";
import Header from "../header";
import Footer from "../footer";
import Container from "../container";

export default ({
  children,
  pageTitle = undefined,
  ogImage = undefined
}: {
  children: React.ReactNode;
  pageTitle?: string | undefined;
  ogImage?: string | undefined;
}) => {
  return (
    <Container>
      <Header pageTitle={pageTitle} ogImage={ogImage} />

      <main>{children}</main>

      <Footer />
    </Container>
  );
};
