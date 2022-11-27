import glob from "glob";
import path from "path";
console.log(path.join(__dirname, "..", "benckmark", "**/*.json"));

["hyperfine" /*"autocannon"*/].forEach((item) => {
  glob(`./benchmark/**/${item}/*.json`, {}, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    console.log("files", item, files);
  });
});
