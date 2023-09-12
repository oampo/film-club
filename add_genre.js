import * as fs from "fs";
import { catchup } from "./catchup.js";

function main() {
  if (process.argv.length <= 2) {
    console.log("Usage: node add_genre.js <genre>...");
    process.exit(1);
  }
  const db = JSON.parse(fs.readFileSync("db.json"));
  const { watchers } = db;
  let { genres } = db;
  genres = catchup(genres);
  for (const name of process.argv.slice(2)) {
    if (genres.find(x => x.name === name)) {
      console.warn(`${name} is already a genre - skipping`);
      continue;
    }
    genres.push({
      name,
      count: genres.length ? Math.min(...genres.map((x) => x.count)) : 0,
    });
  }
  fs.writeFileSync("db.json", JSON.stringify({watchers, genres}, undefined, 2));
}

main();
