import React from "react";
import Header from "../header";
import Footer from "../footer";
import Container from "../container";

export default ({ children, pageTitle = undefined, ogImage = undefined }) => {
  return (
    <Container>
      <Header pageTitle={pageTitle} ogImage={ogImage} />

      <main>{children}</main>

      <Footer />
    </Container>
  );
};
