import Head from "next/head";
import Area from "../../components/Area";
import Link from "next/link";
import dataInfo from "../../output/hyper.info.data.json";
import dataTarball from "../../output/hyper.tarball.data.json";
import randomColor from "randomcolor";
import dayjs from "dayjs";
export async function getStaticProps() {
  return {
    props: {
      dataInfo,
      dataTarball
    },
  };
}

function getData(jsonData, metric) {
  const labels = {};
  const datasets = Object.keys(jsonData).reduce((acc: any, item) => {
    const color = randomColor();
    if (!acc[item]) {
      const d = jsonData[item].map((item) => {
        labels[item.timestamp] = {};
        return { x: item.timestamp, y: item[metric] };
      });

      acc.push({
        label: item,
        borderColor: color,
        backgroundColor: color,
        data: d,
      });
    }
    return acc;
  }, []);

  const a = Object.keys(labels).map((i) => {
    const g = dayjs(Number(i)).format("YYYY-MM-DD HH:mm:ss");
    return g;
  });

  return {
    labels: a,
    datasets,
  };
}

export default function Hyper({ dataInfo, dataTarball }) {
  return (
    <div>
      <Head>
        <title>Verdaccio benchmark with hyperfine</title>
        <meta name="description" content="Verdaccio benchmark with hyperfine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Link href="/">Home</Link>
        </div>
        <h1>Tarball</h1>
        <div className="flex flex-row flex-wrap" style={{ width: "100%" }}>
          <div className="basis-1/2">
            <Area type="mean" data={getData(dataTarball, "mean")} />
          </div>
          <div className="basis-1/2">
            <Area type="median" data={getData(dataTarball, "median")} />
          </div>
          <div className="basis-1/2">
            <Area type="min" data={getData(dataTarball, "min")} />
          </div>
          <div className="basis-1/2">
            <Area type="max" data={getData(dataTarball, "max")} />
          </div>
        </div>
      </main>
    </div>
  );
}
