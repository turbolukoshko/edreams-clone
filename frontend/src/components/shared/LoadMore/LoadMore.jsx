import React from "react";
import { Button } from "../Button/Button.jsx";
import "./LoadMore.scss";

const LoadMore = ({ setPaginationOffset }) => {
  const loadMore = () => {
    setPaginationOffset((prev) => prev + 10);
  };

  return (
    <div className="load-more-container">
      <Button onClick={loadMore} title="Show More" />
    </div>
  );
};

export default LoadMore;
