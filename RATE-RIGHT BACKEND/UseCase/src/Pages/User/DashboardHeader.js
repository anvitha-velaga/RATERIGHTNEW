import { Link } from "react-router-dom";
import './UserDashboard.css';

const DashboardHeader = ({ username, onLogout }) => {
  return (
    <header className="dashboard-header">
      <h2>Welcome, {username} 🎉</h2>
      <nav>
        <Link to="/UserDashboard" className="link-nav">Home</Link>
        <Link to="/SubmitFeedback" className="link-nav">Submit new feedback</Link>
        <Link to="/ViewStatus" className="link-nav">View Recents</Link>
      </nav>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default DashboardHeader;
