import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Redirect from "../modules/redirect";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("Redirect", () => {
  test("displays invalid CRNs message when data.exist is false", async () => {
    const mockData = { exist: false };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<Redirect />, { wrapper: MemoryRouter });
    const invalidCrnsMessage = await screen.findByText(
      /It seems you entered some CRNs, which do not exist/i
    );
    expect(invalidCrnsMessage).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  test("displays Redirecting message when counter does not equal crn.length", async () => {
    const mockData = { exist: true, check: 1 };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<Redirect />, { wrapper: MemoryRouter });
    const redirectingMessage = await screen.findByText(/Redirecting/i);
    expect(redirectingMessage).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
