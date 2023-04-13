import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../modules/display";
import { MemoryRouter } from "react-router-dom";

describe("Display component", () => {

  it("displays loading text while fetching data", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve() }));

    render(<Display />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
