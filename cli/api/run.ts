import { writeFileSync } from "fs";

const path = require("path");
const debug = require("debug")("metrics:autocannon");
const autocannon = require("autocannon");

function getURL(benchmark) {
  switch (benchmark) {
    case "info":
      return "http://localhost:4873/jquery";
    case "tarball":
      return "http://localhost:4873/jquery/-/jquery-3.6.0.tgz";
    default:
      throw new TypeError("no benckmark supported");
  }
}

export default async function run(
  benchmark,
  version,
  url?: string,
  dryRun?: boolean,
  connections?: number,
) {
  try {
    debug("api report start");
    debug("url", getURL(benchmark));
    debug("dry run", dryRun);
    const result = await autocannon({
      url: url ?? getURL(benchmark),
      connections: connections ?? 100,
      pipelining: 1,
      duration: 60,
    });
    const wrapResults = {
      results: [result],
    };
    const reportPath = path.join(
      process.cwd(),
      `./api-results-${version}-${benchmark}.json`
    );
    debug("report path %o", reportPath);
    if (!dryRun) {
      writeFileSync(reportPath, JSON.stringify(wrapResults, null, 2), "utf-8");
    }
    debug("report ends");
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`error on process autocannon run`, err);
    process.exit(1);
  }
}
