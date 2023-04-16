import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Display from "../modules/display";

test("displays loading message when data is not yet fetched", async () => {
  render(<Display />, { wrapper: MemoryRouter });
  const loadingMessage = screen.getByText(/loading/i);
  expect(loadingMessage).toBeInTheDocument();
});

test("displays message when user is not registered", async () => {
  const mockData = { result: [], error: true };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
  render(<Display />, { wrapper: MemoryRouter });
  console.log(await global.fetch());
  const notRegisteredMessage = await screen.findByText(
    /You are not registered with us yet/i
  );
  expect(notRegisteredMessage).toBeInTheDocument();
  global.fetch.mockRestore();
});

test("displays message when user is not in any class groups", async () => {
  const mockData = { result: [] };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
  render(<Display />, { wrapper: MemoryRouter });
  const notInAnyGroupMessage = await screen.findByText(
    /you are not in any class groups/i
  );
  expect(notInAnyGroupMessage).toBeInTheDocument();
  global.fetch.mockRestore();
});

test("displays correct number of class groups when user is in one or more groups", async () => {
  const mockData = {
    crns: [12345, 67890],
    result: [
      ["Class Group 1", "Course 1"],
      ["Class Group 2", "Course 2"],
    ],
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
  render(<Display />, { wrapper: MemoryRouter });
  screen.debug();
  const firstGroupDetails = await screen.findByText(/Class Group 1/i);
  const secondGroupDetails = await screen.findByText(/Class Group 2/i);

  expect(firstGroupDetails).toBeInTheDocument();
  expect(secondGroupDetails).toBeInTheDocument();

  global.fetch.mockRestore();
});
