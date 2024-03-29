export const convertToCurrency = (value) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(value);
};

export const formatDate = (string, type = "datetime") => {
  let formattedDate;
  if (string) {
    const date = new Date(string);
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const amPM = date.getHours() > 11 ? "pm" : "am";
    if (type === "date")
      formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
    if (type === "datetime")
      formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()} ${hour}:${minute}${amPM}`;
  }
  return formattedDate;
};

export const formatUsername = (user) => {
  if (user) return user.name ? user.name : user.username;
  return "";
};
