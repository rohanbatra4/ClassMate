import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirm from "../modules/confirm";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("Confirm component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders confirmation page heading", () => {
    render(
      <MemoryRouter>
        <Confirm />
      </MemoryRouter>
    );
    const headingElement = screen.getByText(
      /confirm if you wish to join these groups:/i
    );
    expect(headingElement).toBeInTheDocument();
  });

  test("displays join button", () => {
    render(
      <MemoryRouter>
        <Confirm />
      </MemoryRouter>
    );
    const joinButton = screen.getByRole("button", { name: /join/i });
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toBeDisabled();
  });
});
