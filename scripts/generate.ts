import glob from "glob";
import path from "path";
import semver from "semver";
import fs from "fs";
import dayjs from "dayjs";

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
  files.forEach((item) => {
    console.log("processing...", item);
    const [, , date, , version] = item.split("/");
    const [, , numberVersion, ...rest] = version.split("-");
    const major = semver.coerce(numberVersion).major;
    const [type] = rest[rest.length - 1].split(".");
    typeFile = type;
    const data = require(path.join(__dirname, "../", item)).results[0];
    if (!final[major]) {
      final[major] = [];
      filters.versions.push(major);
      filters.minDate = dayjs(date).valueOf();
      filters.maxDate = dayjs(date).valueOf();
    } else {
      if(dayjs(date).isBefore(dayjs(filters.minDate))) {
        filters.minDate = dayjs(date).valueOf();
      }
      if(dayjs(date).isAfter(dayjs(filters.maxDate))) {
        filters.maxDate = dayjs(date).valueOf();
      }
    }
    const { mean, median, min, max } = data;
    final[major].push({
      timestamp: new Date(date).getTime(),
      mean,
      median,
      min,
      max,
    });
  });
  // const keys = Object.keys(final);
  filters.customRange = [dayjs(filters.maxDate).subtract(30, 'days').valueOf(), filters.maxDate]
  fs.writeFileSync(
    path.join(__dirname, `../output/hyper.${typeFile}.data.json`),
    JSON.stringify({data: final, filters}, null, 3)
  );
}

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*info.json`, processFiles);
});

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*tarball.json`, processFiles);
});
