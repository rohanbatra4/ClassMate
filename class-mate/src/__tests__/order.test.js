import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Order from "../modules/order";

describe("Order component", () => {
  it("renders the component without crashing", () => {
    render(<Order />, { wrapper: MemoryRouter });
  });

  it("renders the 'Congratulations!' heading", () => {
    render(<Order />, { wrapper: MemoryRouter });
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
  });

  it("renders the 'You have been successfully added to all class groups!' text", () => {
    render(<Order />, { wrapper: MemoryRouter });
    expect(
      screen.getByText("You have been successfully added to all class groups!")
    ).toBeInTheDocument();
  });

  it("renders the 'Your classes' text in bold", () => {
    render(<Order />, { wrapper: MemoryRouter });
    const boldText = screen.getByText("Your groups");
    expect(boldText.tagName).toBe("B");
  });

  it("renders the 'Want to join more groups?' link", () => {
    render(<Order />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole("link", { name: "Want to join more groups?" })
    ).toBeInTheDocument();
  });
});
