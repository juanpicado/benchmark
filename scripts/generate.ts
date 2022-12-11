import glob from "glob";
import path from "path";
import fs from "fs";

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*info.json`, {}, function (err, files) {
    const final = {};
    files.forEach((item) => {
      console.log('processing...', item)
      const [, , date, , version] = item.split("/");
      const [, , numberVersion, ...rest] = version.split("-");
      const data = require(path.join(__dirname, "../", item)).results[0];
      if (!final[numberVersion]) {
        final[numberVersion] = [];
      }
      const { mean, median, min, max } = data;
      final[numberVersion].push({
        timestamp: new Date(date).getTime(),
        mean,
        median,
        min,
        max,
      });
    });
    fs.writeFileSync(
      path.join(__dirname, `../output/hyper.data.json`),
      JSON.stringify(final, null, 3)
    );
  });
});
