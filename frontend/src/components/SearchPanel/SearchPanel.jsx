import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import { useFetch } from "../../../hooks/useFetch.jsx";
import Calendar from "../shared/Calendar/Calendar.jsx";
import { Dropdown } from "../shared/Dropdown/Dropdown.jsx";
import { Button } from "../shared/Button/Button.jsx";
import "./SearchPanel.scss";
import { locationValidator } from "../../utils/locationValidator.js";
import {
  generateItinerariesUrl,
  generateLocationUrl,
} from "../../utils/generateUrl.js";
import { Loader } from "../shared/Loader/Loader.jsx";
import { validateForm } from "../../utils/validateForm.js";
import { calculateCurrentMonth } from "../../utils/calculateCurrentMonth.js";

const SearchPanel = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [searchParams] = useSearchParams();
  // Get initial value for form via query params
  const initialDepartureLocation = searchParams.get("departureLocation") || "";
  const initialArrivalLocation = searchParams.get("arrivalLocation") || "";
  const initialDepartureDay = {
    day:
      searchParams.get("departureDay") === "null"
        ? new Date().getDate()
        : searchParams.get("departureDay"),
    month:
      searchParams.get("departureMonth") === "null"
        ? new Date().getMonth()
        : searchParams.get("departureMonth"),
    year:
      searchParams.get("departureYear") === "null"
        ? new Date().getFullYear()
        : searchParams.get("departureYear"),
  };

  const url = generateLocationUrl();

  const { data, loading, error } = useFetch(url);
  const [selectedDay, setSelectedDay] = useState(initialDepartureDay);
  const [departureLocation, setDepartureLocation] = useState(
    initialDepartureLocation
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    initialArrivalLocation
  );
  const [arrivalError, setArrivalError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", detectOutsideClick);

    return () => document.removeEventListener("mousedown", detectOutsideClick);
  }, [showCalendar]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setShowCalendar(false);
  };

  const detectOutsideClick = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  const handleSubmit = () => {
    const { day, month, year } = selectedDay;
    const isSameLocation = locationValidator(
      departureLocation,
      arrivalLocation,
      setArrivalError
    );
    const currentMonth = calculateCurrentMonth(month);
    const url = generateItinerariesUrl(
      departureLocation,
      arrivalLocation,
      year,
      currentMonth,
      day,
      false
    );

    !isSameLocation &&
      validateForm(
        departureLocation,
        arrivalLocation,
        selectedDay.day,
        setArrivalError
      ) &&
      navigate(url);
  };

  return (
    <div className="search-panel">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <div className="form__panel">
          <Dropdown
            options={data}
            placeholder={"Where do you leave from?"}
            value={departureLocation}
            onChange={setDepartureLocation}
          />
          <Dropdown
            options={data}
            placeholder={"Where are you going?"}
            value={arrivalLocation}
            onChange={setArrivalLocation}
          />
          <Button
            onClick={() => setShowCalendar(!showCalendar)}
            variant="secondary"
            className="medium"
            title={
              selectedDay.day !== null
                ? `${selectedDay.day}/${calculateCurrentMonth(
                    initialDepartureDay.month !== null
                      ? initialDepartureDay.month
                      : selectedDay.month - 1,
                    true
                  )}`
                : "Departure day"
            }
          />
          {showCalendar && (
            <div className="calendar-container" ref={calendarRef}>
              <Calendar
                selectDay={handleSelectDay}
                initialSelectedDate={
                  selectedDay.day
                    ? new Date(
                        selectedDay.year,
                        selectedDay.month - 1,
                        selectedDay.day
                      )
                    : null
                }
              />
            </div>
          )}
        </div>
        <p className="form__panel-error">{arrivalError}</p>
      </form>
      <Button
        onClick={handleSubmit}
        variant="primary"
        title="Search flights"
        className="right"
      />
    </div>
  );
};

export default SearchPanel;
