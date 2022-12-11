import Head from "next/head";
import Area from "../components/Area";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import data from "../output/hyper.data.json";
import randomColor from "randomcolor";
import dayjs from "dayjs";
export async function getServerSideProps(context) {
  return {
    props: {
      data,
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

export default function Hyper({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Verdaccio benchmark with hyperfine</title>
        <meta name="description" content="Verdaccio benchmark with hyperfine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div className="flex flex-row flex-wrap" style={{ width: "100%" }}>
          <div className="basis-1/2">
            <Area type="mean" data={getData(data, "mean")} />
          </div>
          <div className="basis-1/2">
            <Area type="median" data={getData(data, "median")} />
          </div>
          <div className="basis-1/2">
            <Area type="min" data={getData(data, "min")} />
          </div>
          <div className="basis-1/2">
            <Area type="max" data={getData(data, "max")} />
          </div>
        </div>
      </main>
    </div>
  );
}
