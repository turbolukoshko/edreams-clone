import React from "react";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__quote">
        <p>
          "In lost things, discoveries await us because we must get lost to find
          ourselves again."
        </p>

        <p>—Eduardo Galeano</p>
      </div>
      <div className="not-found__error">
        <p className="not-found__error-message">PAGE NOT FOUND</p>
        <p className="not-found__error-code">404</p>
      </div>
    </div>
  );
};

export default NotFound;
