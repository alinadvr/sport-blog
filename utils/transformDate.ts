export function transformDate(date: string | number) {
  const newDate = new Date(date);
  return newDate.toLocaleString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
