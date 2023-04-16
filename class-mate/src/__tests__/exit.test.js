import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Exit from "../modules/exit";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("Exit component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Exit component without crashing", () => {
    render(<Exit />, { wrapper: MemoryRouter });
  });
  test("displays loading message while data is being fetched", () => {
    const { getByText } = render(<Exit />, { wrapper: MemoryRouter });
    expect(getByText("Loading...")).toBeInTheDocument();
  });
  test("displays message when user is not registered", async () => {
    const mockData = { result: [], error: true };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<Exit />, { wrapper: MemoryRouter });
    const notRegisteredMessage = await screen.findByText(
      /You are not registered with us yet/i
    );
    expect(notRegisteredMessage).toBeInTheDocument();
    global.fetch.mockRestore();
  });
  test("displays message when user is not in any class groups", async () => {
    const mockData = { result: [], error: false };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<Exit />, { wrapper: MemoryRouter });
    const notInAnyGroupsMessage = await screen.findByText(
      /You are not in any class groups/i
    );
    expect(notInAnyGroupsMessage).toBeInTheDocument();
    global.fetch.mockRestore();
  });
  test("displays list of groups when user is registered and in at least one group", async () => {
    const mockData = {
      result: [
        ["Group 1", "Class 1"],
        ["Group 2", "Class 2"],
      ],
      crns: [11111, 22222],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<Exit />, { wrapper: MemoryRouter });
    const group1Checkbox = await screen.findByLabelText(
      "Group 1: Class 1 (11111)"
    );
    const group2Checkbox = await screen.findByLabelText(
      "Group 2: Class 2 (22222)"
    );
    expect(group1Checkbox).toBeInTheDocument();
    expect(group2Checkbox).toBeInTheDocument();
    global.fetch.mockRestore();
  });
  test("handles leave group button click", async () => {
    const mockData = {
      result: [
        ["Group 1", "Class 1"],
        ["Group 2", "Class 2"],
      ],
      crns: [11111, 22222],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    axios.post.mockResolvedValueOnce({
      data: { message: "Groups left successfully" },
    });
    render(<Exit />, { wrapper: MemoryRouter });
    const group1Checkbox = await screen.findByLabelText(
      "Group 1: Class 1 (11111)"
    );
    const group2Checkbox = await screen.findByLabelText(
      "Group 2: Class 2 (22222)"
    );
    const leaveGroupButton = await screen.findByText("Leave");
    fireEvent.click(group1Checkbox);
    fireEvent.click(group2Checkbox);
    fireEvent.click(leaveGroupButton);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:4567/leave",
      { groups: [11111, 22222] },
      { headers: { "Content-Type": "application/json" } }
    );
    global.fetch.mockRestore();
  });
});
