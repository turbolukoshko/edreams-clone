import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ItineraryItem from "./ItineraryItem";

jest.mock("./ItineraryItem.scss", () => ({}));

jest.mock("../shared/Button/Button", () => ({
  Button: ({ title, variant, className }) => (
    <button className={`${className} ${variant}`}>{title}</button>
  ),
}));

jest.mock("../shared/ItineraryIcon/ItineraryIcon", () => ({
  ItineraryIcon: () => <div>Icon</div>,
}));

const mockItinerary = {
  carrier: "Airline Name",
  departureLocation: "New York",
  departureDate: "2024-05-28T15:30:00Z",
  arrivalLocation: "London",
  arrivalDate: "2024-05-28T22:45:00Z",
  price: 1200,
};

describe("ItineraryItem component", () => {
  it("renders the carrier name", () => {
    const { getByText } = render(<ItineraryItem itinerary={mockItinerary} />);
    expect(getByText("Airline Name")).toBeInTheDocument();
  });

  it("renders the departure location, time, and date correctly", () => {
    const { getByText } = render(<ItineraryItem itinerary={mockItinerary} />);
    expect(getByText("New York")).toBeInTheDocument();
    expect(getByText("15:30")).toBeInTheDocument();
    expect(getByText("28/5")).toBeInTheDocument();
  });

  it("renders the arrival location, time, and date correctly", () => {
    const { getByText } = render(<ItineraryItem itinerary={mockItinerary} />);
    expect(getByText("London")).toBeInTheDocument();
    expect(getByText("29/5")).toBeInTheDocument();
  });

  it("renders the price correctly", () => {
    const { getByText } = render(<ItineraryItem itinerary={mockItinerary} />);
    expect(getByText("1200 €")).toBeInTheDocument();
  });

  it("renders the buy button", () => {
    const { getByText } = render(<ItineraryItem itinerary={mockItinerary} />);
    const button = getByText("Buy");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bottom primary");
  });

  it("renders the ItineraryIcon component", () => {
    const { getByText } = render(<ItineraryItem itinerary={mockItinerary} />);
    expect(getByText("Icon")).toBeInTheDocument();
  });
});
