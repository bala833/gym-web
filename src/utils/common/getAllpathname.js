export const getPathname = () => {
  const location = window.location.pathname;
  const newStr = location.replace("/", "");
  return newStr;
};
