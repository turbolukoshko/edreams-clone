const carriersData = require("../data/carriers.json");
const _ = require("lodash");
const locationsData = require("../data/locations.json");

const NUM_RESULTS = 100;

class Itinerary {
  constructor({
    departureLocation,
    arrivalLocation,
    departureYear,
    departureMonth,
    departureDay,
    flightDuration,
  }) {
    this.carrier = _.sample(carriersData);
    this.departureLocation = departureLocation;
    this.arrivalLocation = arrivalLocation;
    this.departureDate = createDepartureDate(
      departureYear,
      departureMonth,
      departureDay
    );
    this.arrivalDate = createArrivalDate(this.departureDate, flightDuration);
    this.price = (50 + Math.random() * 200).toFixed(2);
    this.currency = "EUR";
    this.seatsLeft = Math.floor(2 + Math.random() * 10);
  }
}

function createDepartureDate(departureYear, departureMonth, departureDay) {
  const hours = Math.floor(Math.random() * 24);
  const mins = Math.floor(Math.random() * 60);
  const seg = Math.floor(Math.random() * 60);
  return new Date(
    departureYear,
    departureMonth,
    departureDay,
    hours,
    mins,
    seg
  );
}

function createArrivalDate(departureDate, flightDuration) {
  const arrivalDate = new Date(departureDate);
  arrivalDate.setHours(arrivalDate.getHours() + flightDuration);
  return arrivalDate;
}

exports.search = (request) => {
  const departureDay =
    new Date().getDate() > 9
      ? `${new Date().getDate()}`
      : `0${new Date().getDate()}`;
  const departureMonth =
    new Date().getMonth() > 9
      ? `${new Date().getMonth()}`
      : `0${new Date().getMonth()}`;
  const departureYear = `${new Date().getFullYear()}`;

  request.departureDay =
    request.departureDay === "null" || request.departureDay
      ? `${departureDay}`
      : request.departureDay;

  request.departureMonth =
    request.departureMonth === "null" || request.departureMonth
      ? `${departureMonth}`
      : request.departureMonth;

  request.departureYear =
    request.departureYear === "null" || request.departureYear
      ? `${departureYear}`
      : request.departureYear;

  const itineraries = [];
  const flightDuration = 1 + Math.random() * 11;
  for (var i = 0; i < NUM_RESULTS; i++) {
    request.departureLocation =
      request.departureLocation ||
      locationsData[Math.floor(Math.random() * locationsData.length)];

    request.arrivalLocation =
      request.arrivalLocation ||
      locationsData[Math.floor(Math.random() * locationsData.length)];
    itineraries.push(new Itinerary({ ...request, flightDuration }));
  }
  return itineraries;
};
