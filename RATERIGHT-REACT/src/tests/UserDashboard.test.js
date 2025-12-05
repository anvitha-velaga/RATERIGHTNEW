jest.mock("axios");
jest.mock("react-router-dom");
jest.mock("../Pages/User/DashboardHeader", () => {
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
import userEvent from "@testing-library/user-event";
import axios from "axios";
import * as routerModule from "react-router-dom";
import UserDashboard from "../Pages/User/UserDashboard";

const mockNavigate = jest.fn();

describe("UserDashboard Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(routerModule, "useNavigate").mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Redirect to login if no token
  test("Test 1: Should redirect to login page if no authentication token", () => {
    render(<UserDashboard />);
    expect(mockNavigate).toHaveBeenCalledWith("/UserLogin");
  });

  // Test 2: Display feedbacks when token exists
  test("Test 2: Should display all submitted feedbacks from API", async () => {
    localStorage.setItem("token", "test-token-123");
    localStorage.setItem("userName", "testuser");
    const mockFeedbacks = [
      {
        id: 1,
        mentorName: "Subba Reddy",
        week: "Week 1",
        submittedOn: "2025-12-01",
        status: "Approved",
      },
      {
        id: 2,
        mentorName: "Subba Reddy",
        week: "Week 2",
        submittedOn: "2025-12-02",
        status: "Pending",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockFeedbacks });

    render(<UserDashboard />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://localhost:7079/api/Feedback/my-feedbacks",
        {
          headers: {
            Authorization: "Bearer test-token-123",
          },
        }
      );
      // Use getAllByText for multiple matches
      expect(screen.getAllByText(/Subba Reddy/i)).toHaveLength(2);
      expect(screen.getByText(/Approved/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    });
  });
});
