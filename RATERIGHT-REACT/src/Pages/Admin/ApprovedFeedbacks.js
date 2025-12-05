import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import DashboardHeader from "./DashboardHeader";

const ApprovedFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = localStorage.getItem("userName");

  useEffect(() => {
    fetchApprovedFeedbacks();
  }, []);

  const fetchApprovedFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://localhost:7079/api/Feedback/all-feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const approved = res.data.filter(f => f.status.toLowerCase() === "approved");
      setFeedbacks(approved);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load approved feedbacks");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading approved feedbacks...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-container">
    <DashboardHeader username={user} onLogout={handleLogout} />
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Approved Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No approved feedbacks</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Mentor</th>
              <th>Week</th>
              <th>Lines Of Code</th>
              <th>Rating</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(f => (
              <tr key={f.id}>
                <td>{f.userName || "N/A"}</td>
                <td>{f.mentorName}</td>
                <td>{f.week}</td>
                <td>{f.linesOfCode}</td>
                <td>{f.rating}</td>
                <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedFeedbacks;
