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

export function currencyFormat(num) {
  return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
