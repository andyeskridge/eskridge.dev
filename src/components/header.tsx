import Link from "next/link";
import Head from "next/head";
import ExtLink from "./ext-link";
import { useRouter } from "next/router";
import tw from "twin.macro";
import styled from "styled-components/macro";

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: "Home", page: "/" },
  { label: "Contact", page: "/contact" },
];

const ogImageUrl = "https://notion-blog.now.sh/og-image.png";

const NavLink = styled.a([
  tw`text-xl`,
  ({ active }) =>
    active ? tw`font-semibold text-blue-400` : tw`font-normal text-gray-100`,
]);

export default ({ titlePre = "" }) => {
  const { pathname } = useRouter();

  return (
    <header tw="block min-h-full p-8 text-center tracking-tighter">
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
          <li tw="inline-block p-2" key={label}>
            {page ? (
              <Link href={page}>
                <NavLink active={pathname === page}>{label}</NavLink>
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
