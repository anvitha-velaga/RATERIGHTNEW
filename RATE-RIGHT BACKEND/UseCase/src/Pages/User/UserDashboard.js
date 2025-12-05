import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";

const UserDashboard = () => { 
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("Feedback/my-feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
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
        <h3>All Submitted Feedbacks</h3>
        <table>
          <thead>
            <tr>
              <th>Mentor</th>
              <th>Week</th>
              <th>Submitted On</th>
              <th>Status</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>

          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map(f => (
                <tr key={f.id}>
                  <td>{f.mentorName}</td>
                  <td>{f.week}</td>
                  <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                   <td style={{color:f.status === "Pending"? "red": f.status === "Approved"? "green": "black",fontWeight: "600"}}>
                  {f.status === "Pending"? `⏳ ${f.status}`: f.status === "Approved"? `✅ ${f.status}`: f.status}
                  </td>
                  {/* <td>
                    <button className="Trash" onClick={() => handleDelete(f.id)}>
                      <FaTrash />
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No feedbacks submitted yet.</td></tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserDashboard;
