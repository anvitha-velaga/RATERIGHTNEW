jest.mock("../SplashScreen");
jest.mock("../Pages/User/UserLogin");
jest.mock("../Pages/User/UserRegister");
jest.mock("../Pages/User/UserDashboard");
jest.mock("../Pages/User/SubmittedFeedbacks");
jest.mock("../Pages/User/SubmitFeedback");
jest.mock("../Pages/User/ViewStatus");
jest.mock("../Pages/Admin/AdminDashboard");
jest.mock("../Pages/Admin/AllUsers");
jest.mock("../Pages/Admin/PendingFeedbacks");
jest.mock("../Pages/Admin/FetchUsers");
jest.mock("../Pages/Admin/ApprovedFeedbacks");
jest.mock("../Footer");
jest.mock("../ProtectRoutes");
import React from "react";
import App from "../App";
describe("App Tests", () => {
  // Test App component can be imported successfully
  test(" App component should exist and be a valid React component", () => {
    expect(App).toBeDefined();
    // Check if App is a function
    expect(typeof App).toBe("function");
    //App is callable
    expect(() => App()).not.toThrow();
  });
});
