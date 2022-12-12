import Area from "../../components/Area";

import { useFilterProvider } from "../../components/Filters";

import dayjs from "dayjs";
import { sortBy, cloneDeep } from "lodash";

import { colors } from "../../lib/colors";

const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

function getData(jsonData, metric) {
  const labels = {};
  const datasets = Object.keys(jsonData).reduce((acc: any, item: any) => {
    if (!acc[item]) {
      const data = jsonData[item].map((jsonItem) => {
        labels[jsonItem.timestamp] = {};
        return {
          x: jsonItem.timestamp,
          y: jsonItem[metric],
        };
      });
      acc.push({
        label: item,
        borderColor: colors[item],
        backgroundColor: colors[item],
        borderWidth: 0.8,
        cubicInterpolationMode: "monotone",
        tension: 10,
        data: sortBy(data, ["x"]),
        spanGaps: true,
      });
    }
    return acc;
  }, []);

  const a = Object.keys(labels).sort();
  return {
    labels: a,
    datasets,
  };
}

function filter(info, filters) {
  const data = cloneDeep(info);
  const { from, to } = filters;
  const keys = Object.keys(data.data);
  keys.forEach((i) => {
    data.data[i] = data.data[i].filter((i) => {
      const c = i.timestamp >= from && i.timestamp <= to;
      return c;
    });
  });

  return data;
}

export function HyperInfo({ dataInfo }) {
  const { from, to } = useFilterProvider();
  const data = filter(dataInfo, { from, to });
  return (
    <div>
      <h1>Metadata</h1>
      <div className="flex flex-row flex-wrap" style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Area type="mean" data={getData(data.data, "mean")} />
        </div>
        <div style={{ width: "100%" }}>
          <Area type="median" data={getData(data.data, "median")} />
        </div>
        <div style={{ width: "100%" }}>
          <Area type="min" data={getData(data.data, "min")} />
        </div>
        <div style={{ width: "100%" }}>
          <Area type="max" data={getData(data.data, "max")} />
        </div>
      </div>
    </div>
  );
}
