import { Red_Hat_Display } from "next/font/google";
import Head from "next/head";
import React from "react";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });

interface RootLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {props.title
            ? `${props.title} | Francuski paviljon`
            : "Francuski paviljon"}
        </title>
        <meta
          name="description"
          content={
            props.description || "Izložbeni paviljon Republike Francuske"
          }
        />
      </Head>
      <main className={redHatDisplay.className}>{props.children}</main>
    </>
  );
};

export default RootLayout;
