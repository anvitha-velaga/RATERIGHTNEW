import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

const AllFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

 const fetchFeedbacks = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://localhost:7079/api/Feedback/all-feedbacks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFeedbacks(res.data || []);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setError("Failed to load feedbacks");
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };
  const user = localStorage.getItem("userName");

  if (loading) return <p className="center-text">Loading feedbacks...</p>;
  if (error) return <p className="center-text error-text">{error}</p>;

  return (
    <div className="dashboard-container">
      <DashboardHeader username={user} onLogout={handleLogout} />
      <h2 className="page-title">All Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="center-text">No feedbacks found</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Mentor</th>
                <th>Week</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Lines Of Code</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f.id}>
                  <td>{f.userName || "N/A"}</td>
                  <td>{f.mentorName}</td>
                  <td>{f.week}</td>
                  <td>{f.rating}</td>
                  <td style={{color:f.status === "Pending"? "red": f.status === "Approved"? "green": "black",fontWeight: "600"}}>
                  {f.status === "Pending"? `⏳ ${f.status}`: f.status === "Approved"? `✅ ${f.status}`: f.status}
                  </td>
                  <td>{f.linesOfCode}</td>
                  <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AllFeedbacks;

