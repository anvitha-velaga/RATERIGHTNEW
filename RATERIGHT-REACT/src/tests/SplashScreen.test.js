jest.mock("react-router-dom");
import { render, screen, waitFor } from "@testing-library/react";
import * as routerModule from "react-router-dom";
import SplashScreen from "../SplashScreen";
const mockNavigate = jest.fn();
describe("SplashScreen Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(routerModule, "useNavigate").mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test("Test 1: Should render splash screen with logo, title and loading text", () => {
    render(<SplashScreen />);
    const logo = screen.getByAltText(/WinWire Logo/i);
    expect(logo).toBeInTheDocument();
    expect(screen.getByText(/Welcome to RATE RIGHT/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test(" render logo with correct width and margin", () => {
    render(<SplashScreen />);
    const logo = screen.getByAltText(/WinWire Logo/i);
    expect(logo).toHaveStyle({ width: "200px", marginBottom: "20px" });
  });

  test("render title as h1 element", () => {
    render(<SplashScreen />);
    const title = screen.getByText(/Welcome to RATE RIGHT/i);
    expect(title.tagName).toBe("H1");
    expect(title.className).toBe("splash-title");
  });

  test(" navigate to /UserLogin after exactly 3500ms", async () => {
    render(<SplashScreen />);
    expect(mockNavigate).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3500);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/UserLogin");
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  test("Should not navigate before 3.5 seconds ", () => {
    render(<SplashScreen />);
    jest.advanceTimersByTime(3000);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("Should cleanup timer when component unmounts", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const { unmount } = render(<SplashScreen />);
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
