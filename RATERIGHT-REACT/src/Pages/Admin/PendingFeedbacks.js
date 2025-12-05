import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const ManagePendingFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchPendingFeedbacks();
  }, []);

  const fetchPendingFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://localhost:7079/api/Feedback/all-feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const pending = res.data.filter(f => f.status === "Pending");
      setFeedbacks(pending);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending feedbacks");
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  // Approve All
 const handleApproveAll = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch("https://localhost:7079/api/Feedback/approve-all", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMsg(res.data || "All feedbacks approved!");
    fetchPendingFeedbacks();
  } catch (err) {
    console.error(err);
    setMsg("Failed to approve all feedbacks");
  }
};
//Approve by Id
const handleApprove = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(`https://localhost:7079/api/Feedback/approve/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMsg (`Feedback #${id} approved`);
    fetchPendingFeedbacks();
  } catch (err) {
    console.error(err);
    setMsg(`Failed to approve feedback #${id}`);
  }
};

  if (loading) return <p style={{ textAlign: "center" }}>Loading pending feedbacks...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  const user = localStorage.getItem("userName");

  return (
    <div className="dashboard-container">
      <DashboardHeader username={user} onLogout={handleLogout} />

      <h2>Pending Feedbacks</h2>

      {msg && <p className="info-msg">{msg}</p>}

      {feedbacks.length === 0 ? (
        <p>No pending feedbacks</p>
      ) : (
        <>
          <button className="approve-btn" onClick={handleApproveAll}>
            Approve All
          </button>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Mentor</th>
                <th>Week</th>
                <th>Lines Of Code</th>
                <th>Rating</th>
                <th>Submitted On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.userName || "N/A"}</td>
                  <td>{f.mentorName}</td>
                  <td>{f.week}</td>
                  <td>{f.linesOfCode}</td>
                  <td>{f.rating}</td>
                  <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>

                  <td style={{
                      color: f.status === "Pending" ? "red" : "green",
                      fontWeight: "600"
                    }}
                  >
                    {f.status === "Pending" ? `⏳ ${f.status}` : `✅ ${f.status}`}
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(f.id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManagePendingFeedbacks;
