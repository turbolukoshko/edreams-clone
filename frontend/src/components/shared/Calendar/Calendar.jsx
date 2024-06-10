import React, { useState, useEffect } from "react";
import "./Calendar.scss";

function Calendar({ selectDay, initialSelectedDate }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (initialSelectedDate) {
      setSelectedDate(new Date(initialSelectedDate));
      setDate(new Date(initialSelectedDate));
    } else {
      setSelectedDate(new Date());
    }
  }, [initialSelectedDate]);

  const goToPreviousMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (selectedDay) => {
    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      selectedDay
    );
    setSelectedDate(newSelectedDate);
    const day = selectedDay > 9 ? `${selectedDay}` : `0${selectedDay}`;
    const month =
      newSelectedDate.getMonth() + 1 > 9
        ? `${newSelectedDate.getMonth() + 1}`
        : `0${newSelectedDate.getMonth() + 1}`;
    const year = `${newSelectedDate.getFullYear()}`;
    selectDay({ day, month, year });
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day) => (
      <div className="day-of-week" key={day}>
        {day}
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDay = lastDayOfMonth.getDate();

    const calendarDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(
        <div className="calendar-day empty" key={`empty-${i}`}></div>
      );
    }

    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      calendarDays.push(
        <div
          className={`calendar-day ${
            currentDate.toDateString() === new Date().toDateString()
              ? "today"
              : ""
          } ${
            selectedDate &&
            currentDate.toDateString() === selectedDate.toDateString()
              ? "selected"
              : ""
          }`}
          key={currentDate.toDateString()}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button className="nav-button" onClick={goToPreviousMonth}>
          &lt;
        </button>
        <div className="month-year">
          {months[date.getMonth()]} {date.getFullYear()}
        </div>
        <button className="nav-button" onClick={goToNextMonth}>
          &gt;
        </button>
      </div>
      <div className="days-of-week">{renderDaysOfWeek()}</div>
      <div className="calendar-days">{renderCalendarDays()}</div>
    </div>
  );
}

export default Calendar;
