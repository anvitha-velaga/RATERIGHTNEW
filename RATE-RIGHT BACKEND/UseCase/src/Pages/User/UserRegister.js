import React, { useState } from "react";
import api from "../../axiosConfig";
import "./UserLogin.css"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true); // state for validation

  const validatePassword = (password) => {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setMsg(""); 

    if (newPassword.length > 0) {
        setIsPasswordValid(validatePassword(newPassword));
    } else {
        setIsPasswordValid(true);
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
        setMsg("Password must be at least 8 characters long.");
        setIsPasswordValid(false);
        return; 
    }

    setMsg("");
    setIsPasswordValid(true); 
    
    try {
      await api.post("UserLogin/register", {
        name,
        userName: username,
        password,
        Role: "User", 
      });
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/UserLogin"), 2000); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg("Registration failed- Username already exists or server error.");
    }
  };

  const getPasswordValidationMessage = () => {
    if (password.length > 0 && !isPasswordValid) {
      if (password.length < 8) return 'Password must be at least 8 characters long.';
    }
    return '';
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleRegister}>
        <h2 className="login-title">Rate-Right</h2>
        <h2 className="login-title">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange} 
          required
  
          style={{ 
              borderColor: (password.length > 0 && !isPasswordValid) ? 'red' : '' 
          }}
        />

        {getPasswordValidationMessage() && (
            <p className="info-msg" style={{ color: 'orange' }}>
                {getPasswordValidationMessage()}
            </p>
        )}
        
        {msg && <p className="info-msg">{msg}</p>}

        <button 
            type="submit" 
            className="primary-btn" 
            disabled={password.length > 0 && !isPasswordValid}
        >
            Register
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/UserLogin")}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;