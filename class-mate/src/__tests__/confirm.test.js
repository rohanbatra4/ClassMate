import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirm from "../modules/confirm";

describe("Confirm", () => {
  it("renders the component without crashing", () => {
    render(<Confirm />, { wrapper: MemoryRouter });
  });

  it("renders the 'Confirm' heading", () => {
    render(<Confirm />, { wrapper: MemoryRouter });
    expect(
      screen.getByText("Confirm if you wish to join these groups:")
    ).toBeInTheDocument();
  });
  it("renders the 'Join' button", () => {
    render(<Confirm />, { wrapper: MemoryRouter });
    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();
  });

  it("displays an alert when the 'Join' button is clicked with no CRNs selected", () => {
    render(<Confirm />, { wrapper: MemoryRouter });
    const joinButton = screen.getByRole("button", { name: "Join" });
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.click(joinButton);
    expect(alertSpy).toHaveBeenCalledWith("Please select at least one CRN");
    alertSpy.mockRestore();
  });
});
