import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ItinerariesList from "./ItinerariesList";
import { useFetch } from "../../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

jest.mock("./ItinerariesList.scss", () => ({}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("../shared/Loader/Loader", () => ({
  Loader: () => <div>Loading...</div>,
}));

jest.mock("../ItineraryItem/ItineraryItem", () => ({
  __esModule: true,
  default: ({ itinerary }) => (
    <li data-testid="itinerary-item">{`Itinerary ${itinerary.carrier} - ${itinerary.price}`}</li>
  ),
}));

jest.mock("../shared/LoadMore/LoadMore.jsx", () => () => <button>Load More</button>);

jest.mock("../../../hooks/useFetch.jsx", () => ({
  useFetch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("../../utils/generateUrl.js", () => ({
  generateItinerariesUrl: jest.fn(),
}));

jest.mock("../shared/Loader/Loader.jsx", () => () => <div>Loading...</div>);

describe("ItinerariesList", () => {
  beforeEach(() => {
    useSearchParams.mockReturnValue([
      new URLSearchParams({
        departureLocation: "New York",
        arrivalLocation: "Los Angeles",
        departureYear: "2024",
        departureMonth: "05",
        departureDay: "28",
      }),
    ]);

    jest.clearAllMocks();
  });

  it("displays component with empty data", async () => {
    useFetch.mockReturnValue({ data: [], loading: false, error: false });

    render(<ItinerariesList />);

    expect(await screen.getByRole("list")).toBeInTheDocument();
  });

  it("displays itineraries sorted by price", async () => {
    const itineraries = [
      {
        carrier: "Carrier A",
        price: 300,
        arrivalLocation: "Los Angeles",
        departureDate: "2024-05-28T10:00:00Z",
        arrivalDate: "2024-05-28T15:00:00Z",
      },
      {
        carrier: "Carrier B",
        price: 200,
        arrivalLocation: "Los Angeles",
        departureDate: "2024-05-28T10:00:00Z",
        arrivalDate: "2024-05-28T15:00:00Z",
      },
      {
        carrier: "Carrier C",
        price: 400,
        arrivalLocation: "Los Angeles",
        departureDate: "2024-05-28T10:00:00Z",
        arrivalDate: "2024-05-28T15:00:00Z",
      },
    ];

    useFetch.mockReturnValue({
      data: itineraries,
      loading: false,
      error: null,
    });

    render(<ItinerariesList />);

    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveTextContent("200");
      expect(items[1]).toHaveTextContent("300");
      expect(items[2]).toHaveTextContent("400");
    });
  });
});
