jest.mock("axios");
jest.mock("react-router-dom");

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import * as routerModule from "react-router-dom";
import Register from "../Pages/User/UserRegister";

const mockNavigate = jest.fn();

describe("UserRegister Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(routerModule, "useNavigate").mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Render registration form
  test("Test 1: Should render registration form with all inputs", () => {
    render(<Register />);

    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  // Test 2: Should call API with correct data when registering
  test("Test 2: Should call API with correct data when registering", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        message: "Registration successful",
      },
    });

    render(<Register />);

    await userEvent.type(screen.getByPlaceholderText(/Full Name/i), "John Doe");
    await userEvent.type(screen.getByPlaceholderText(/Username/i), "johndoe");
    await userEvent.type(screen.getByPlaceholderText(/Password/i), "SecurePass123");

    await userEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://localhost:7079/api/UserLogin/register",
        {
          name: "John Doe",
          userName: "johndoe",
          password: "SecurePass123",
          Role: "User",
        }
      );
    });
  });
});
