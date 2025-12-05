import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/UserLogin");
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="splash-container"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontFamily: "Arial",
      }}
    >
      <img
        src="/WinWireLogo 1.png"
        alt="WinWire Logo"
        style={{
          width: "200px", 
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <div
        className="splash-content"
        style={{ textAlign: "center" }}
      >
        <h1
          className="splash-title"
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1e3a8a",
            marginBottom: "10px",
          }}
        >
          Welcome to RATE RIGHT 
        </h1>
        <p
          className="splash-subtitle"
          style={{
            fontSize: "16px",
            color: "#C74627",
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
