import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import Enter from "../modules/Enter";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("Enter", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with one input field", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Enter />
      </MemoryRouter>
    );

    expect(getByPlaceholderText("CRN #1")).toBeInTheDocument();
  });

  it("adds a new input field when the 'Add more CRNs' button is clicked", () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Enter />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Add more CRNs"));

    expect(getByPlaceholderText("CRN #1")).toBeInTheDocument();
    expect(getByPlaceholderText("CRN #2")).toBeInTheDocument();
  });

  it("submits valid CRNs to the backend when the 'Submit' button is clicked", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Enter />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("CRN #1"), {
      target: { value: "12345" },
    });
    fireEvent.click(getByText("Add more CRNs"));
    fireEvent.change(getByPlaceholderText("CRN #2"), {
      target: { value: "67890" },
    });

    axios.post.mockResolvedValue({ data: { success: true } });

    fireEvent.click(getByText("Submit"));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:4567/verify",
      { crns: ["12345", "67890"] },
      { headers: { "Content-Type": "application/json" } }
    );

    await expect(axios.post).toHaveBeenLastCalledWith(
      "http://localhost:4567/verify",
      { crns: ["12345", "67890"] },
      { headers: { "Content-Type": "application/json" } }
    );
  });

  it("prevents form submission if no CRNs are entered and displays an alert", () => {
    window.alert = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Enter />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Submit"));

    expect(axios.post).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Please enter valid CRNs");
  });
});
