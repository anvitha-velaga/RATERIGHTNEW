jest.mock("axios");
jest.mock("react-router-dom");
jest.mock("../Pages/Admin/DashboardHeader", () => {
  return function MockDashboardHeader({ username, onLogout }) {
    return (
      <div data-testid="dashboard-header">
        <p>Welcome, {username}</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  };
});

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import * as routerModule from "react-router-dom";
import AdminDashboard from "../Pages/Admin/AdminDashboard";

const mockNavigate = jest.fn();

describe("AdminDashboard Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(routerModule, "useNavigate").mockReturnValue(mockNavigate);
    // Mock Link component
    jest.spyOn(routerModule, "Link").mockImplementation(({ to, children }) => (
      <a href={to}>{children}</a>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Redirect to login if no token
  test("Test 1: Should redirect to login if user is not authenticated", () => {
    render(<AdminDashboard />);

    expect(mockNavigate).toHaveBeenCalledWith("/UserLogin");
  });

  // Test Display report cards
  test("Test 2: Should display all report card titles", async () => {
    localStorage.setItem("token", "admin-token-123");
    localStorage.setItem("userName", "admin");

    axios.get.mockResolvedValue({ data: [] });

    render(<AdminDashboard />);

    await waitFor(() => {
      // all report card titles are displayed
      expect(screen.getByText("Total Feedbacks")).toBeInTheDocument();
      expect(screen.getByText("Pending Feedbacks")).toBeInTheDocument();
      expect(screen.getByText("Approved Feedbacks")).toBeInTheDocument();
      expect(screen.getByText("Total Users")).toBeInTheDocument();
    });
  });
});
