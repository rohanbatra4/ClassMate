import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Complete from "../modules/complete";

describe("Complete component", () => {
  it("renders the component without crashing", () => {
    render(<Complete />, { wrapper: MemoryRouter });
  });

  it("renders the 'Congratulations!' heading", () => {
    render(<Complete />, { wrapper: MemoryRouter });
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
  });

  it("renders the 'You have been successfully added to all class groups!' text", () => {
    render(<Complete />, { wrapper: MemoryRouter });
    expect(
      screen.getByText("You have been successfully added to all class groups!")
    ).toBeInTheDocument();
  });

  it("renders the 'Your classes' text in bold", () => {
    render(<Complete />, { wrapper: MemoryRouter });
    const boldText = screen.getByText("Your groups");
    expect(boldText.tagName).toBe("B");
  });

  it("renders the 'Want to join more groups?' link", () => {
    render(<Complete />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole("link", { name: "Want to join more groups?" })
    ).toBeInTheDocument();
  });
});
