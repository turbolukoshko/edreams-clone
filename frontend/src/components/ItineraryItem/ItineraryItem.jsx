import React from "react";
import { Button } from "../shared/Button/Button.jsx";
import { ItineraryIcon } from "../shared/ItineraryIcon/ItineraryIcon.jsx";
import "./ItineraryItem.scss";
import { getTime } from "../../utils/getTime.js";
import { getMonth } from "../../utils/getMonth.js";

const ItineraryItem = ({ itinerary }) => {
  return (
    <li className="itinerary-list__item">
      <div className="itinerary-list__item-info">
        <p className="itinerary-list__item-info-airline">{itinerary.carrier}</p>
        <div className="itinerary-list__item-info-details">
          <div className="itinerary-list__item-info-details-direction">
            <p className="itinerary-list__item-info-details-location">
              {itinerary.departureLocation}
            </p>
            <p className="itinerary-list__item-info-details-time">
              {getTime(itinerary.departureDate)}
            </p>
            <p className="itinerary-list__item-info-details-date">
              {getMonth(itinerary.departureDate)}
            </p>
          </div>
          <div>
            <ItineraryIcon />
          </div>
          <div className="itinerary-list__item-info-details-direction">
            <p className="itinerary-list__item-info-details-location">
              {itinerary.arrivalLocation}
            </p>
            <p className="itinerary-list__item-info-details-time">
              {getTime(itinerary.arrivalDate)}
            </p>
            <p className="itinerary-list__item-info-details-date">
              {getMonth(itinerary.arrivalDate)}
            </p>
          </div>
        </div>
      </div>
      <div className="itinerary-list__item-price">
        <p className="itinerary-list__item-price-inner">
          {itinerary.price} &euro;
        </p>
        <Button title="Buy" variant="primary" className="bottom" />
      </div>
    </li>
  );
};

export default ItineraryItem;
