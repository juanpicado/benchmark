/* eslint-disable no-console */
import { Command, Option } from "clipanion";

import runApi from "./run";

export class ApiCommand extends Command {
  public static paths = [["api"]];

  private benchmark = Option.String("-f", {
    description: "benchmark to run",
    required: true,
  });

  private url = Option.String("-u", {
    description: "url to execute",
    required: false,
  });

  private version = Option.String("-v", {
    description: "version is running",
    required: true,
  });

  private dryRun = Option.Boolean("-d", {
    description: "dry run execution",
    required: false,
  });

  public async execute() {
    try {
      await runApi(this.benchmark, this.version, this.url, this.dryRun);
    } catch (err: any) {
      console.error(err);
      process.exit(1);
    }
  }
}
