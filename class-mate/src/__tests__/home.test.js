import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../modules/Home";

describe("Home", () => {
  it("renders the banner image", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByAltText("banner")).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(
      screen.getByPlaceholderText("example123@gmail.com")
    ).toBeInTheDocument();
  });

  it("renders the country input field", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText("Choose your country")).toBeInTheDocument();
  });
  it("renders the state input field", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText("Choose your state")).toBeInTheDocument();
  });
  it("renders the college input field", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText("Choose your college")).toBeInTheDocument();
  });
  it("renders the submit button", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("displays an alert when the submit button is pressed without filling any fields", () => {
    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Home />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText("Submit"));
    expect(spy).toHaveBeenCalledWith("Please select all the fields");
    spy.mockRestore();
  });
});
