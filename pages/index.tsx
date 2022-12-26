import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Verdaccio benchmark</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col" style={{ width: "100%" }}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/hyper/info">Hyperfine Metadata</Link>
            </li>          
            <li>
              <Link href="/hyper/tarball">Hyperfine Tarball</Link>
            </li>          
          </ul>
        </div>
      </main>
    </React.Fragment>
  );
}