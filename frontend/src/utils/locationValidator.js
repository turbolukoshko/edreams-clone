export const locationValidator = (
  departureLocation,
  arrivalLocation,
  setArrivalError
) => {
  if (
    departureLocation === arrivalLocation &&
    departureLocation !== "" &&
    arrivalLocation !== ""
  ) {
    setArrivalError("The origin and destination cannot be the same");
    return true;
  }
  setArrivalError(null);
  return false;
};
