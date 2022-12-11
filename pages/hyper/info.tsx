import Head from "next/head";
import { FilterProvider } from "../../components/Filters";

import Link from "next/link";
import dataInfo from "../../output/hyper.info.data.json";

import { FilterController } from "../../components/Filters/FilterController";
import { HyperInfo } from "../../components/Hyper";
export async function getStaticProps() {
  return {
    props: {
      dataInfo,
    },
  };
}

export default function Hyper({ dataInfo }) {
  return (
    <div>
      <Head>
        <title>Verdaccio benchmark with hyperfine</title>
        <meta name="description" content="Verdaccio benchmark with hyperfine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Link href="/">Back</Link>
        </div>
        <FilterProvider filters={dataInfo.filters}>
          <FilterController />
          <HyperInfo dataInfo={dataInfo} />
        </FilterProvider>
      </main>
    </div>
  );
}
