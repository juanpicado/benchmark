import Area from "../../components/Area";
import { useFilterProvider } from "../../components/Filters";

import dayjs from "dayjs";

import { colors } from "../../lib/colors";

const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

function getData(jsonData, metric, { from, to }) {
  const labels = {};
  const datasets = Object.keys(jsonData).reduce((acc: any, item: any) => {
    if (!acc[item]) {
      const data = jsonData[item]
        .map((jsonItem) => {
          labels[jsonItem.timestamp] = {};

          if (jsonItem.timestamp >= from && jsonItem.timestamp <= to) {
            return {
              x: dayjs(Number(jsonItem.timestamp)).format("YYYY-MM-DD"),
              y: jsonItem[metric],
            };
          }
        })
        .filter((i) => typeof i !== "undefined");
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
      if (i >= from && i <= to) {
        const g = dayjs(Number(i)).format("YYYY-MM-DD");
        return g;
      }
    })
    .filter((i) => typeof i !== "undefined");
  return {
    labels: a,
    datasets,
  };
}

export function HyperInfo({ dataInfo }) {
  const { from, to } = useFilterProvider();
  return (
    <div>
      <h1>Metadata</h1>
      <div className="flex flex-row flex-wrap" style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Area
            type="mean"
            data={getData(dataInfo.data, "mean", { from, to })}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Area
            type="median"
            data={getData(dataInfo.data, "median", { from, to })}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Area type="min" data={getData(dataInfo.data, "min", { from, to })} />
        </div>
        <div style={{ width: "100%" }}>
          <Area type="max" data={getData(dataInfo.data, "max", { from, to })} />
        </div>
      </div>
    </div>
  );
}
