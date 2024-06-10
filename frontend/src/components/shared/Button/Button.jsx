import React from "react";
import "./Button.scss";

export const Button = ({
  onClick,
  variant = "primary",
  title,
  className = "",
}) => {
  return (
    <button onClick={onClick} className={`button ${variant} ${className}`}>
      {title}
    </button>
  );
};
