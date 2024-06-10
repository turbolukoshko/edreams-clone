const baseUrl = "http://localhost:3000";
const urls = {
  locations: "locations",
  itineraries: "itineraries",
};

export const generateLocationUrl = () => {
  return `${baseUrl}/${urls.locations}`;
};

export const generateItinerariesUrl = (
  departureLocation,
  arrivalLocation,
  departureYear,
  departureMonth,
  departureDay,
  withBaseUrl = true
) => {
  return `${withBaseUrl ? baseUrl : ""}/${
    urls.itineraries
  }?departureLocation=${departureLocation}&arrivalLocation=${arrivalLocation}&departureYear=${departureYear}&departureMonth=${departureMonth}&departureDay=${departureDay}`;
};
