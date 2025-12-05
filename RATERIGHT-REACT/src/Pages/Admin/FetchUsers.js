// src/Pages/Admin/AllUsers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import DashboardHeader from "./DashboardHeader";

const FetchUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = localStorage.getItem("userName");

  useEffect(() => {
    fetchUsers();
  }, []);

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://localhost:7079/api/Feedback/GetAllUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
        setLoading(false);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };
  if (loading) return <p style={{ textAlign: "center" }}>Loading users...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  return (
    <div className="dashboard-container">
      <DashboardHeader username={user} onLogout={handleLogout} />
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.userName}>
                <td>{u.name}</td>
                <td>{u.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchUsers;
