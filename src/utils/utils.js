export function getUrlQueryString(queryObj) {
  const queryString = Object.entries(queryObj)
    .map(([key, value]) => {
      if (value) {
        return `${key}=${value}`;
      } else {
        return "*";
      }
    })
    .filter((value) => value != "*")
    .join("&");
  return queryString;
}
