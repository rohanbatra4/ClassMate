import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Info2 from "../modules/info2";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("Info2", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with one email input field", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Info2 />
      </MemoryRouter>
    );

    expect(getByPlaceholderText("example123@gmail.com")).toBeInTheDocument();
  });

  it("prevents form submission and displays an alert when no email is entered", () => {
    window.alert = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Info2 />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Submit"));

    expect(axios.post).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Please enter your email id");
  });

  it("prevents form submission and displays an alert when an invalid email is entered", () => {
    window.alert = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Info2 />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("example123@gmail.com"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(getByText("Submit"));

    expect(axios.post).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid email id");
  });

  it("submits a valid email to the backend when the 'Submit' button is clicked", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Info2 />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("example123@gmail.com"), {
      target: { value: "valid-email@example.com" },
    });

    axios.post.mockResolvedValue({ data: { success: true } });

    fireEvent.click(getByText("Submit"));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:4567/emailsend",
      { email: "valid-email@example.com" },
      { headers: { "Content-Type": "application/json" } }
    );

    await expect(axios.post).toHaveBeenLastCalledWith(
      "http://localhost:4567/emailsend",
      { email: "valid-email@example.com" },
      { headers: { "Content-Type": "application/json" } }
    );
  });
});
