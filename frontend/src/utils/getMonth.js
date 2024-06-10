export const getMonth = (date) =>
  `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`;
