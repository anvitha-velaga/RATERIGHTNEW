import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../axiosConfig";
import "./AdminDashboard.css";
import DashboardHeader from "./DashboardHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState({
    totalFeedbacks: 0,
    pending: 0,
    approved: 0,
    users: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
    fetchReports();
  }, []);

  
  const fetchReports = async () => {
    try {
      const fbRes = await api.get("Feedback/all-feedbacks");
      const feedbacks = fbRes.data;

      const usersRes = await api.get("Feedback/GetAllUsers");
      const users = Array.isArray(usersRes.data)
        ? usersRes.data.length
        : usersRes.data.data?.length || 0;

      const totalFeedbacks = feedbacks.length;
      const pending = feedbacks.filter(
        (f) => f.status.toLowerCase() === "pending"
      ).length;
      const approved = feedbacks.filter(
        (f) => f.status.toLowerCase() === "approved"
      ).length;

      setReports({ totalFeedbacks, pending, approved, users });
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  const user = localStorage.getItem("userName");

  return (
    <div className="dashboard-container">
  <DashboardHeader username={user} onLogout={handleLogout} />
      <main className="dashboard-content">
        <h3 className="reports-title">Reports</h3>
        <div className="reports-grid">
          <Link to="/AllUsers" className="report-card-link">
            <div className="report-card">
              <h4>Total Feedbacks</h4>
              <p>{reports.totalFeedbacks}</p>
            </div>
          </Link>

          <Link to="/PendingFeedbacks" className="report-card-link">
            <div className="report-card">
              <h4>Pending Feedbacks</h4>
              <p>{reports.pending}</p>
            </div>
          </Link>

          <Link to="/ApprovedFeedbacks" className="report-card-link">
            <div className="report-card">
              <h4>Approved Feedbacks</h4>
              <p>{reports.approved}</p>
            </div>
          </Link>

          <Link to="/FetchUsers" className="report-card-link">
            <div className="report-card">
              <h4>Total Users</h4>
              <p>{reports.users}</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
