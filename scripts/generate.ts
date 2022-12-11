import glob from "glob";
import path from "path";
import semver from 'semver';
import fs from "fs";

function porcessHyper(err, files) {
  const final = {};
  let typeFile = '';
  files.forEach((item) => {
    console.log("processing...", item);
    const [, , date, , version] = item.split("/");    
    const [, , numberVersion, ...rest] = version.split("-");
    console.log('version', numberVersion, '-->', semver.coerce(numberVersion));
    const major = semver.coerce(numberVersion).major;
    const [type] = rest[rest.length - 1].split(".");
    typeFile = type;
    const data = require(path.join(__dirname, "../", item)).results[0];
    if (!final[major]) {
      final[major] = [];
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
  fs.writeFileSync(
    path.join(__dirname, `../output/hyper.${typeFile}.data.json`),
    JSON.stringify(final, null, 3)
  );
}

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*info.json`, porcessHyper);
});

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*tarball.json`, porcessHyper);
});
