import {useState} from 'react';
import Head from "next/head";
import Area from "../../components/Area";
import styles from "../../styles/Home.module.css";

import Link from "next/link";
import dataInfo from "../../output/hyper.info.data.json";
import dataTarball from "../../output/hyper.tarball.data.json";
import dayjs from "dayjs";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { colors } from "../../lib/colors";
export async function getStaticProps() {
  return {
    props: {
      dataInfo,
      dataTarball,
    },
  };
}

function getData(jsonData, metric, options) {
  const labels = {};
  const datasets = Object.keys(jsonData).reduce((acc: any, item) => {
    if (!acc[item]) {
      const data = jsonData[item].map((item) => {
        labels[item.timestamp] = {};
        return {
          x: dayjs(Number(item.timestamp)).format("YYYY-MM-DD"),
          y: item[metric],
        };
      });

      acc.push({
        label: item,
        borderColor: colors[item],
        backgroundColor: colors[item],
        borderWidth: 0.8,
        cubicInterpolationMode: "monotone",
        tension: 10,
        data,
        spanGaps: true,
      });
    }
    return acc;
  }, []);

  const a = Object.keys(labels)
    .sort()
    .map((i) => {
      const g = dayjs(Number(i)).format("YYYY-MM-DD");
      return g;
    });
  console.log("datasets", datasets);
  console.log("labels", a);
  return {
    labels: a,
    datasets,
  };
}

export default function Hyper({ dataInfo, dataTarball }) {
  const [value, onChange] = useState(new Date());
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
        <DatePicker onChange={onChange} value={value} />
        <h1>Metadata</h1>
        <div className="flex flex-row flex-wrap" style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <Area type="mean" data={getData(dataInfo, "mean", {})} />
          </div>
          <div style={{ width: "100%" }}>
            <Area type="median" data={getData(dataInfo, "median", {})} />
          </div>
          <div style={{ width: "100%" }}>
            <Area type="min" data={getData(dataInfo, "min", {})} />
          </div>
          <div style={{ width: "100%" }}>
            <Area type="max" data={getData(dataInfo, "max", {})} />
          </div>
        </div>
      </main>
    </div>
  );
}
