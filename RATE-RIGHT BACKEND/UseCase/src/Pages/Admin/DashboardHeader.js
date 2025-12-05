import { Link } from "react-router-dom";

const DashboardHeader = ({ username, onLogout }) => {
  return (
     <header className="dashboard-header">
           <h2>Welcome, {username}👋</h2>
           <nav className="dashboard-nav">
          <Link to="/AdminDashboard" className="link-nav">Home</Link>
           <Link to="/AllUsers" className="link-nav">All Users</Link>
           <Link to="/PendingFeedbacks" className="link-nav">Approve Feedbacks</Link>
           </nav>
           <button onClick={onLogout} className="logout-btn">Logout</button>
         </header>
  );
};
export default DashboardHeader;
