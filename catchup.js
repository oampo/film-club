export function catchup(arr) {
  const maxCount = Math.max(...arr.map((x) => x.count));
  return arr.map((x) => ({
    ...x,
    count: maxCount - x.count > 1 ? maxCount - 1 : x.count,
  }));
}
