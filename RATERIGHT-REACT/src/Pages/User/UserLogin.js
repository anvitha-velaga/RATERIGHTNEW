import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://localhost:7079/api/UserLogin/login", {
      UserName: username,
      Password: password,
    });

    const user = res.data;
    if (!user) {
      setMsg("Invalid login");
      return;
    }

    localStorage.setItem("token", user.token);
    localStorage.setItem("userName", user.userName);
    //navigate based on role 
    const userRole = user.role;
    if (userRole === "Admin") navigate("/AdminDashboard");
    else navigate("/UserDashboard");
    } catch (err) {
    console.error(err.response?.data || err.message);
    setMsg("Invalid username or password");
    }
    };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
       {/* <h2 className="login-title">Rate-Right</h2> */}
        <img 
          //winwire logo placement
            src="/WinWireLogo 1.png" 
            alt="WinWire Logo" 
            className="login-logo"
            style={{ maxWidth: '180px', marginBottom: '10px',marginLeft:'120px' }} 
        />
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {msg && <p className="error-msg">{msg}</p>}
       <button type="submit" className="primary-btn">Login</button>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/UserRegister")}
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Login;
