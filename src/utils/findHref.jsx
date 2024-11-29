export const extractHref = (htmlString) => {
  const hrefRegex = /href=["']([^"']+)["']/;
  const match = htmlString.match(hrefRegex);
  return console.log(match ? match[1] : null);
};
