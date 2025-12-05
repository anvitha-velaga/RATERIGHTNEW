import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/UserLogin");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="splash-container"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eef3fb",
        fontFamily: "Arial",
      }}
    >
      <div
        className="splash-content"
        style={{ textAlign: "center" }}
      >
        <h1
          className="splash-title"
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Welcome to RATE RIGHT 
        </h1>

        <p
          className="splash-subtitle"
          style={{
            fontSize: "16px",
            color: "#666",
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
