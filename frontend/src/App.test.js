import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/ItineraryItem/ItineraryItem.scss", () => ({}));
jest.mock("./components/ItinerariesList/ItinerariesList.scss", () => ({}));
jest.mock("../stylesheets/global.scss", () => ({}));
jest.mock("./components/NotFound/NotFound.scss", () => ({}));
jest.mock("./components/shared/Button/Button.scss", () => ({}));
jest.mock("./components/shared/Loader/Loader.scss", () => ({}));
jest.mock("./components/shared/Calendar/Calendar.scss", () => ({}));
jest.mock("./components/shared/Dropdown/Dropdown.scss", () => ({}));
jest.mock("./components/shared/LoadMore/LoadMore.scss", () => ({}));
jest.mock("./components/SearchPanel/SearchPanel.jsx", () => {
  return () => <div data-testid="mock-search-panel">Mock SearchPanel</div>;
});

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders home component when '/' route is accessed", () => {
    render(<App />);
    expect(screen.getByText("Mock SearchPanel")).not.toBeNull();
  });
});
