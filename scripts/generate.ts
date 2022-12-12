import glob from "glob";
import path from "path";
import semver from "semver";
import fs from "fs";
import dayjs from "dayjs";
import { sortedUniq } from "lodash";

function processFiles(err, files) {
  const filters = {
    versions: [],
    minDate: null,
    maxDate: null,
    customRange: [null, null],
  } as any;
  if (err) {
    console.error(`error on process files`, err);
    return;
  }
  const final = {};
  let typeFile = "";
  const timestamps: number[] = [];
  files.forEach((item) => {
    console.log("processing...", item);
    const [, , date, , version] = item.split("/");
    if(!date) {
      throw Error('no date');
    }

    const [, , numberVersion, ...rest] = version.split("-");
    const major = semver.coerce(numberVersion).major;
    const [type] = rest[rest.length - 1].split(".");
    typeFile = type;
    const data = require(path.join(__dirname, "../", item)).results[0];
    if (!final[major]) {
      final[major] = [];
      filters.versions.push(major);
    }
    const { mean, median, min, max } = data;
    timestamps.push(Number(date));
    final[major].push({
      timestamp: Number(date),
      mean,
      median,
      min,
      max,
    });
  });
  const dates = sortedUniq(timestamps);
  // const keys = Object.keys(final);
  filters.minDate = dates[0];
  filters.maxDate = dates[dates.length - 1];
  filters.customRange = [dates[dates.length - 30], dates[dates.length - 1]];
  fs.writeFileSync(
    path.join(__dirname, `../output/hyper.${typeFile}.data.json`),
    JSON.stringify({ data: final, filters }, null, 3)
  );
}

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*info.json`, processFiles);
});

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*tarball.json`, processFiles);
});
