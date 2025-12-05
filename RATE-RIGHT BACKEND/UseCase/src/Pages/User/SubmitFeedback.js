import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubmitFeedback.css";
import DashboardHeader from "./DashboardHeader";
import api from "../../axiosConfig";

//star
const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: "6px", margin: "8px 0" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            fontSize: "28px",
            cursor: "pointer",
            color: star <= (hover || rating) ? "#b11bd6ff" : "#ccc",
            transition: "color 0.2s",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function SubmitFeedback() {
  const navigate = useNavigate();
  const [mentorName, setMentorName] = useState("");
  const [week, setWeek] = useState("");
  const [queries, setQueries] = useState("");
  const [openQueries, setOpenQueries] = useState("");
  const [linesOfCode, setLinesOfCode] = useState("");
  const [rating, setRating] = useState(1);
  const users = localStorage.getItem("userName");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/UserLogin");
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) navigate("/UserLogin");
  
    const feedbackData = {
      mentorName,
      week,
      queries,
      openQueries,
      linesOfCode,
      rating: Number(rating),
    };

    try {
      const response = await api.post("/Feedback/submit-feedback", feedbackData);
      alert("Feedback submitted successfully!");
//resset form after submitting
      setMentorName("");
      setWeek("");
      setQueries("");
      setOpenQueries("");
      setLinesOfCode("");
      setRating(1);

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message; 
      console.error("Feedback submission failed:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Authentication failed. Please log in again.");
        handleLogout(); 
      } else {
        alert(`Error submitting feedback: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="form-container-wrapper">
      <DashboardHeader username={users} onLogout={handleLogout} />

      <div className="form-container">
        <h2 className="form-title">
          Freshers 2025 - AppDev - Feedback survey about your Mentor 🌟
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Your Mentor full name</label>
          <input
            type="text"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
            required
          />

          <label>Choose the Week you are providing review for</label>
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            required
          >
            <option value="">Select Week</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={`Week ${i + 1}`}>
                Week {i + 1}
              </option>
            ))}
          </select>

          <label>Did your mentor answer all your questions this week?</label>
          <select
            value={queries}
            onChange={(e) => setQueries(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>If you have open queries, describe them</label>
          <textarea
            type="text"
            value={openQueries}
            onChange={(e) => setOpenQueries(e.target.value)}
            placeholder="Type NA if no open queries"
           rows="4"
            required
          />

          <label>How many lines of code did you write this week?</label>
          <input
            type="number"
            value={linesOfCode}
            onChange={(e) => setLinesOfCode(e.target.value)}
            required
            min={0}
          />

          <label>Overall rating for your mentor</label>
          <StarRating rating={rating} setRating={setRating} />
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}