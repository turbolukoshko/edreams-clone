import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NotFound from "./NotFound.jsx";

jest.mock("./NotFound.scss", () => ({}));

describe("NotFound component", () => {
  it("renders the quote correctly", () => {
    const { getByText } = render(<NotFound />);
    const quoteText = getByText(
      '"In lost things, discoveries await us because we must get lost to find ourselves again."'
    );
    expect(quoteText).toBeInTheDocument();

    const authorText = getByText("—Eduardo Galeano");
    expect(authorText).toBeInTheDocument();
  });

  it("renders the error message and code correctly", () => {
    const { getByText } = render(<NotFound />);
    const errorMessage = getByText("PAGE NOT FOUND");
    expect(errorMessage).toBeInTheDocument();

    const errorCode = getByText("404");
    expect(errorCode).toBeInTheDocument();
  });
});
