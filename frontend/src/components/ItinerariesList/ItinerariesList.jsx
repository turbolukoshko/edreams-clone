import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useFetch } from "../../../hooks/useFetch.jsx";
import { generateItinerariesUrl } from "../../utils/generateUrl.js";
import { Loader } from "../shared/Loader/Loader.jsx";
import ItineraryItem from "../ItineraryItem/ItineraryItem.jsx";
import "./ItinerariesList.scss";
import LoadMore from "../shared/LoadMore/LoadMore.jsx";

const ItinerariesList = () => {
  const [searchParams] = useSearchParams();
  const departureLocation = searchParams.get("departureLocation");
  const arrivalLocation = searchParams.get("arrivalLocation");
  const departureYear = searchParams.get("departureYear");
  const departureMonth = searchParams.get("departureMonth");
  const departureDay = searchParams.get("departureDay");

  const url = generateItinerariesUrl(
    departureLocation,
    arrivalLocation,
    departureYear,
    departureMonth,
    departureDay
  );

  const { data: itineraries = [], loading, error } = useFetch(url);
  const [sortedItineraries, setSortedItineraries] = useState([]);
  const [paginationOffset, setPaginationOffset] = useState(10);

  useEffect(() => {
    const itinerariesCopy = [...itineraries].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );

    setSortedItineraries(itinerariesCopy);
  }, [
    itineraries,
    departureLocation,
    arrivalLocation,
    departureYear,
    departureMonth,
    departureDay,
  ]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <h1>Error</h1>;
  }

  return (
    <>
      <ul className="itinerary-list container">
        {sortedItineraries.slice(0, paginationOffset).map((itinerary) => (
          <ItineraryItem
            itinerary={itinerary}
            key={`${itinerary.carrier}-${departureLocation}-${
              itinerary.arrivalLocation
            }-${new Date(itinerary.departureDate).getTime()}-${new Date(
              itinerary.arrivalDate
            ).getTime()}-${itinerary.price}`}
          />
        ))}
      </ul>

      {paginationOffset < sortedItineraries.length && (
        <LoadMore setPaginationOffset={setPaginationOffset} />
      )}
    </>
  );
};

export default ItinerariesList;
