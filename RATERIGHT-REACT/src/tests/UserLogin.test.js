jest.mock("axios");
jest.mock("react-router-dom");
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import * as routerModule from "react-router-dom";
import Login from "../Pages/User/UserLogin";

const mockNavigate = jest.fn();

describe("UserLogin Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(routerModule, "useNavigate").mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Render login form
  test("Test 1: Should render login form with username and password inputs", () => {
    render(<Login />);

    expect(
      screen.getByPlaceholderText(/Enter Username/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Password/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  // Test 2: Successfully login and store token
  test("Test 2: Should store token in localStorage on successful login", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        token: "test-token-123",
        userName: "testuser",
        role: "User",
      },
    });

    render(<Login />);

    await userEvent.type(
      screen.getByPlaceholderText(/Enter Username/i),
      "testuser"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Enter Password/i),
      "testpass123"
    );

    await userEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("test-token-123");
      expect(localStorage.getItem("userName")).toBe("testuser");
    });
  });
});
