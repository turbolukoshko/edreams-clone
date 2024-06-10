import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchPanel from "./SearchPanel";
import { MemoryRouter } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch.jsx";
import { useSearchParams } from "react-router-dom";

jest.mock("../shared/Calendar/Calendar.scss", () => ({}));
jest.mock("../shared/Dropdown/Dropdown.scss", () => ({}));
jest.mock("../shared/Button/Button.scss", () => ({}));
jest.mock("../shared/Loader/Loader.scss", () => ({}));
jest.mock("./SearchPanel.scss", () => ({}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("../../../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

describe("SearchPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders SearchPanel with initial state", async () => {
    const mockFetchResponse = {
      data: [],
      loading: false,
      error: null,
    };
    useFetch.mockReturnValue(mockFetchResponse);

    const mockSearchParams = {
      get: jest.fn().mockReturnValue(null),
    };
    useSearchParams.mockReturnValue([mockSearchParams]);

    const { getByText } = render(
      <MemoryRouter>
        <SearchPanel />
      </MemoryRouter>
    );

    expect(useFetch).toHaveBeenCalledWith(expect.any(String));
    expect(useSearchParams).toHaveBeenCalled();

    expect(getByText("Where do you leave from?")).toBeInTheDocument();
    expect(getByText("Where are you going?")).toBeInTheDocument();
    expect(getByText("Departure day")).toBeInTheDocument();
    expect(getByText("Search flights")).toBeInTheDocument();
  });
});
