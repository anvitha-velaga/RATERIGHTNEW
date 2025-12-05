jest.mock("react-router-dom");
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as routerModule from "react-router-dom";
import DashboardHeader from "../Pages/User/DashboardHeader";
describe("DashboardHeader Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(routerModule, "Link").mockImplementation(({ to, children }) => (
      <a href={to}>{children}</a>
    ));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  //Display header with username and welcome message
  test("Should render header with welcome message and username", () => {
    const mockOnLogout = jest.fn();
    const username = "AnvithaVelaga";
    render(<DashboardHeader username={username} onLogout={mockOnLogout} />);
    expect(screen.getByText(`Welcome, ${username} 🎉`)).toBeInTheDocument();
  });
  // Test Display navigation links
  test("Test 2: Should render all navigation links", () => {
    const mockOnLogout = jest.fn();
    render(<DashboardHeader username="Anvitha" onLogout={mockOnLogout} />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit new feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/View Recents/i)).toBeInTheDocument();
  });

  //Logout button calls onLogout callback
  test("Test 3: Should call onLogout callback when logout button is clicked", async () => {
    const mockOnLogout = jest.fn();
    render(<DashboardHeader username="Admin User" onLogout={mockOnLogout} />);
    const logoutBtn = screen.getByRole("button", { name: /Logout/i });
    await userEvent.click(logoutBtn);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
