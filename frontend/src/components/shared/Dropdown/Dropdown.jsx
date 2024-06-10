import React from "react";
import "./Dropdown.scss";

export const Dropdown = ({ options, placeholder, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="dropdown"
    >
      <option value="" className="dropdown__option">
        {placeholder}
      </option>
      {options.map((location) => (
        <option key={location} value={location} className="dropdown__option">
          {location}
        </option>
      ))}
    </select>
  );
};
