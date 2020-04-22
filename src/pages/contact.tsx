import Header from "../components/header";
import ExtLink from "../components/ext-link";
import * as Fathom from "fathom-client";
import tw from "twin.macro";

import GitHub from "../components/svgs/github";
import Twitter from "../components/svgs/twitter";
import Envelope from "../components/svgs/envelope";
import LinkedIn from "../components/svgs/linkedin";

const contacts = [
  {
    Comp: Twitter,
    alt: "twitter icon",
    link: "https://twitter.com/andyeskridge",
    goal: "T8D9ZCPC",
  },
  {
    Comp: GitHub,
    alt: "github icon",
    link: "https://github.com/andyeskridge",
    goal: "QZGXQUVM",
  },
  {
    Comp: LinkedIn,
    alt: "linkedin icon",
    link: "https://www.linkedin.com/in/andyeskridge/",
    goal: "H47AD885",
  },
  {
    Comp: Envelope,
    alt: "envelope icon",
    link: "mailto:andy@eskridge.dev",
    goal: "0XBSIPJP",
  },
];

export default () => {
  function logClick(link: string) {
    const contact = contacts.find((c) => c.link === link);
    Fathom.trackGoal(contact.goal, 0);
  }
  return (
    <>
      <Header titlePre="Contact" />
      <div>
        <h1 tw="text-4xl font-extrabold tracking-tighter text-center">
          Contact
        </h1>

        <div tw="text-center text-lg">
          Andy Eskridge - Director of Software Development @{" "}
          <ExtLink href="https://cenergistic.com">Cenergistic</ExtLink>
        </div>

        <div tw="text-center block mx-auto my-4">
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink
                tw="w-4 h-4 inline-block mx-12 fill-current"
                key={link}
                href={link}
                aria-label={alt}
                onClick={(_e) => logClick(link)}
              >
                <Comp height={32} />
              </ExtLink>
            );
          })}
        </div>
      </div>
    </>
  );
};
