import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home.jsx";
import { MemoryRouter } from "react-router-dom";

jest.mock("../ItineraryItem/ItineraryItem.scss", () => ({}));
jest.mock("../ItinerariesList/ItinerariesList.scss", () => ({}));
jest.mock("../../../stylesheets/global.scss", () => ({}));
jest.mock("../NotFound/NotFound.scss", () => ({}));
jest.mock("../shared/Button/Button.scss", () => ({}));
jest.mock("../shared/Loader/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-loader">Mock Loader</div>,
}));
jest.mock("../shared/Calendar/Calendar.scss", () => ({}));
jest.mock("../shared/Dropdown/Dropdown.scss", () => ({}));
jest.mock("..//SearchPanel/SearchPanel.scss", () => ({}));

jest.mock("../SearchPanel/SearchPanel.jsx", () => {
  return () => <div data-testid="mock-search-panel">SearchPanel</div>;
});

describe("Home component", () => {
  test("renders SearchPanel", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(getByTestId("mock-search-panel")).toBeInTheDocument();
  });
});
