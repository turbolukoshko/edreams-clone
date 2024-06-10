export const calculateCurrentMonth = (month, isDatePicker = false) => {
  if (month === null) {
    return null;
  }

  if (isDatePicker) {
    const value = Number(month);
    console.log(value);
    return value > 9 ? `${value + 1}` : `0${value + 1}`;
  }

  const value = Number(month) - 1;
  return value > 9 ? `${value}` : `0${value}`;
};
