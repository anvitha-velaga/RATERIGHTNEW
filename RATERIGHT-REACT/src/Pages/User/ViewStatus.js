import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import DashboardHeader from "./DashboardHeader";

const ViewStatus = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/UserLogin");
    fetchFeedbacks();
  }, []);

    const fetchFeedbacks = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("https://localhost:7079/api/Feedback/my-feedbacks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFeedbacks(res.data);
        } catch (err) {
          console.error(err);
        }
      };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };
  const users= localStorage.getItem("userName");


  return (
    <div className="dashboard-container">
      <DashboardHeader username={users} onLogout={handleLogout} />
      <div className="dashboard-content">
        <h3>Recent Feedbacks</h3>
        <div className="table-container">
          {feedbacks.length === 0 ? (
            <p>You haven’t submitted any feedback yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Week</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {feedbacks
                .sort((a, b) => new Date(b.submittedOn) - new Date(a.submittedOn)) 
                .slice(0, 5) // pick top 5 recent
                .map(f => (
                  <tr key={f.id}>
                    <td>{f.mentorName}</td>
                    <td>{f.week}</td>
                    <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                   <td style={{color:f.status === "Pending"? "red": f.status === "Approved"? "green": "black",fontWeight: "600"}}>
                  {f.status === "Pending"? `⏳ ${f.status}`: f.status === "Approved"? `✅ ${f.status}`: f.status}
                  </td>
                  </tr>
              ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStatus;
