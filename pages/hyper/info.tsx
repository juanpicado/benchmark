import { useState } from "react";
import Head from "next/head";
import Area from "../../components/Area";
import styles from "../../styles/global.module.css";

import Link from "next/link";
import dataInfo from "../../output/hyper.info.data.json";
import dataTarball from "../../output/hyper.tarball.data.json";
import dayjs from "dayjs";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  return {
    labels: a,
    datasets,
  };
}

export default function Hyper({ dataInfo, dataTarball }) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  return (
    <div className={styles.container}>
      <Head>
        <title>Verdaccio benchmark with hyperfine</title>
        <meta name="description" content="Verdaccio benchmark with hyperfine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Link href="/">Back</Link>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={from}
            onChange={(newValue) => {
              console.log('n', newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To"
            value={to}
            onChange={(newValue) => {
              console.log('n', newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
