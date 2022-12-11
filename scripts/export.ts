import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import semver from "semver";

const exportFile = require("../export.json");
// console.log(exportFile.Items);

const info = [];
const tarball = [];

exportFile.Items.forEach((item) => {
  const date = dayjs(Number(item.date.N)).format("YYYY-MM-DDTHH:mm:ss");
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
    console.log("-fileName", fileName);
    const metrics = item.metrics.M;
    fs.writeFileSync(
      fileName,
      JSON.stringify(
        {
          results: [
            {
              command: metrics?.command?.S,
              mean: metrics?.mean?.N,
              median: metrics?.median?.N,
              max: metrics?.max?.N,
              min: metrics?.min?.N,
            },
          ],
        },
        null,
        4
      )
    );
  }
});
