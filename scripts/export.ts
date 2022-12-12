import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import semver from "semver";

const exportFile = require("../export.json");
// console.log(exportFile.Items);

const info = [];
const tarball = [];

exportFile.Items.forEach((item) => {
  const date = item.date.N;
  const folderName = path.join(__dirname, "../benchmark", date, item.tool.S);
  const version = semver.satisfies(item.version.S, "<6.0.0")
    ? item.version.S
    : "6-next";
  const type = item.benchmark.S;
  if (item.tool.S === "hyperfine") {
    fs.mkdirSync(folderName, { recursive: true });
    const fileName = path.join(
      folderName,
      `hyper-results-${version}-${type}.json`
    );
    console.log("process fileName...", fileName);
    const metrics = item.metrics.M;
    fs.writeFileSync(
      fileName,
      JSON.stringify(
        {
          results: [
            {
              command: String(metrics?.command?.S),
              mean: Number(metrics?.mean?.N),
              median: Number(metrics?.median?.N),
              max: Number(metrics?.max?.N),
              min: Number(metrics?.min?.N),
              user: Number(metrics?.user?.N),
              stddev: Number(metrics?.stddev?.N),
              system: Number(metrics?.system?.N),
              commit: String(item?.commit?.S),
              version: String(item?.version?.S),
            },
          ],
        },
        null,
        4
      )
    );
  }
});
