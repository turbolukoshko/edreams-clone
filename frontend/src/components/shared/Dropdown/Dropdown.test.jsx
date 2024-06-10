import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";
import "@testing-library/jest-dom/extend-expect";

jest.mock("./Dropdown.scss", () => ({}));

describe("Dropdown component", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const placeholder = "Select an option";

  const mockOnChange = jest.fn();

  it("renders with options and placeholder", () => {
    const { getByDisplayValue, getByText } = render(
      <Dropdown
        options={options}
        placeholder={placeholder}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(getByDisplayValue(placeholder)).toBeInTheDocument();

    options.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onChange when an option is selected", () => {
    const { getByDisplayValue } = render(
      <Dropdown
        options={options}
        placeholder={placeholder}
        value=""
        onChange={mockOnChange}
      />
    );

    const dropdown = getByDisplayValue(placeholder);
    fireEvent.change(dropdown, { target: { value: "Option 1" } });

    expect(mockOnChange).toHaveBeenCalledWith("Option 1");
  });
});
