export const validateForm = (
  departureLocation,
  arrivalLocation,
  day,
  setArrivalError
) => {
  if (!departureLocation && !arrivalLocation && !day) {
    return true;
  }

  if (!departureLocation) {
    setArrivalError("Missing departure");
    return false;
  }

  if (!arrivalLocation) {
    setArrivalError("Missing arrival");
    return false;
  }

  if (!day) {
    setArrivalError("Missing day");
    return false;
  }

  return true;
};
