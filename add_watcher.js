import * as fs from "fs";
import { catchup } from "./catchup.js";

function main() {
  if (process.argv.length <= 2) {
    console.log("Usage: node add_watcher.js <watcher>...");
    process.exit(1);
  }
  const db = JSON.parse(fs.readFileSync("db.json"));
  const { genres } = db;
  let { watchers } = db;
  watchers = catchup(watchers);
  for (const name of process.argv.slice(2)) {
    if (watchers.find(x => x.name === name)) {
      console.warn(`${name} is already a watcher - skipping`);
      continue;
    }
    watchers.push({
      name,
      count: watchers.length ? Math.min(...watchers.map((x) => x.count)) : 0,
    });
  }
  fs.writeFileSync("db.json", JSON.stringify({watchers, genres}, undefined, 2));
}

main();
