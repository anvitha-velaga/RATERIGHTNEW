import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import SubmittedFeedbacks from "../Pages/User/SubmittedFeedbacks";

jest.mock("axios");

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

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

describe("SubmittedFeedbacks Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "test-token-123");
    localStorage.setItem("userName", "testuser");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Test 1: Should display feedbacks in a table", async () => {
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

    // Mock the Axios response
    axios.get.mockResolvedValueOnce({ data: mockFeedbacks });

    render(<SubmittedFeedbacks />);

    // Wait for feedbacks to appear
    await screen.findByText(/Subba Reddy/i);
    expect(axios.get).toHaveBeenCalledWith(
      "https://localhost:7079/api/Feedback/my-feedbacks",
      {
        headers: {
          Authorization: "Bearer test-token-123",
        },
      }
    );
    expect(screen.getByText(/Subba Reddy/i)).toBeInTheDocument();
    expect(screen.getByText(/Week 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Week 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Approved/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });
});
