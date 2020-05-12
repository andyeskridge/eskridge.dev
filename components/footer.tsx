import Container from "./container";

import Twitter from "./svgs/twitter";
import Github from "./svgs/github";
import Linkedin from "./svgs/linkedin";
import Envelope from "./svgs/envelope";

declare const fathom: { trackGoal: (goal: string, cents: number) => void };

export default function Footer() {
  function logClick(goal: string) {
    fathom?.trackGoal(goal, 0);
  }
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-12 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Andy Eskridge
          </h3>
          <div className="flex flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://twitter.com/andyeskridge"
              className="mx-3"
              rel="noopener"
              target="_blank"
              onClick={(_) => logClick("T8D9ZCPC")}
            >
              <Twitter height={32} />
            </a>
            <a
              href="https://github.com/andyeskridge"
              className="mx-3"
              rel="noopener"
              target="_blank"
              onClick={(_) => logClick("QZGXQUVM")}
            >
              <Github height={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/andyeskridge"
              className="mx-3"
              rel="noopener"
              target="_blank"
              onClick={(_) => logClick("H47AD885")}
            >
              <Linkedin height={32} />
            </a>
            <a
              href="mailto:andy@eskridge.dev"
              className="mx-3"
              rel="noopener"
              target="_blank"
              onClick={(_) => logClick("0XBSIPJP")}
            >
              <Envelope height={32} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
