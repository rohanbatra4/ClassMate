import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Leave from "../modules/leave";

describe("Leave", () => {
  it("renders the Leave component", () => {
    render(<Leave />, { wrapper: MemoryRouter });
    expect(screen.getByText("Sad to see you leave :(")).toBeInTheDocument();
    expect(
      screen.getByText("You have left the selected groups")
    ).toBeInTheDocument();
    expect(screen.getByText("Want to join new groups?")).toBeInTheDocument();
  });

  it("navigates to the root route when the 'Want to join new groups?' link is clicked", () => {
    render(<Leave />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText("Want to join new groups?"));
    expect(window.location.pathname).toBe("/");
  });
});
