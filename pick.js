import * as fs from "fs";
import { catchup } from "./catchup.js";

function main() {
  let { watchers, genres } = JSON.parse(fs.readFileSync("db.json"));

  watchers = catchup(watchers);
  genres = catchup(genres);

  const unavailableWatchers = process.argv.slice(2);
  const availableWatchers = watchers.filter(x => !unavailableWatchers.includes(x.name));
  const minWatcherCount = Math.min(...availableWatchers.map(x => x.count));
  const lowestWatchers = availableWatchers.filter(x => x.count === minWatcherCount);
  const watcher = lowestWatchers[Math.floor(Math.random() * lowestWatchers.length)];

  const minGenreCount = Math.min(...genres.map(x => x.count));
  const lowestGenres = genres.filter(x => x.count === minGenreCount);
  const genre = lowestGenres[Math.floor(Math.random() * lowestGenres.length)];

  console.log(`Watcher: ${watcher.name}`);
  console.log(`Genre: ${genre.name}`);

  watchers = watchers.map(x => x.name === watcher.name ? { ...x, count: x.count + 1 } : x);
  genres = genres.map(x => x.name === genre.name ? { ...x, count: x.count + 1 } : x);

  fs.writeFileSync("db.json", JSON.stringify({watchers, genres}, undefined, 2));
}

main();
