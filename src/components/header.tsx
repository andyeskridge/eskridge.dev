import Link from "next/link";
import Head from "next/head";
import ExtLink from "./ext-link";
import { useRouter } from "next/router";

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: "Home", page: "/" },
  { label: "Contact", page: "/contact" },
];

const ogImageUrl = "https://notion-blog.now.sh/og-image.png";

export default ({ titlePre = "" }) => {
  const { pathname } = useRouter();

  return (
    <header className="block min-h-full p-8 text-center tracking-tighter">
      <Head>
        <title>{titlePre ? `${titlePre} |` : ""} eskridge.dev</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="eskridge.dev" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@andyeskridge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li className="inline-block p-2" key={label}>
            {page ? (
              <Link href={page}>
                <a
                  className={`text-xl ${
                    pathname === page
                      ? "font-semibold text-blue-600"
                      : "font-normal text-gray-500"
                  }`}
                >
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
};
