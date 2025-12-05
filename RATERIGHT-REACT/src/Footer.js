import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      style={{
        width: "100%",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        
        padding: "10px 20px", 
        backgroundColor: "#ffffff",
        color: "rgb(13, 11, 105)",
        fontSize: "13px", 
        position: "fixed",
        bottom: 0,
        left: 0,
        borderTop: "1px solid #e0e0e0", 
        boxSizing: "border-box" 
      }}
    >

      <span style={{ fontWeight: 500 }}>
        WinWire Technologies &copy; {currentYear} 
      </span>

      
      <span style={{ color: "#444" }}> 
        Site owned and managed by Learning & Development department
      </span>
    </footer>
  );
};

export default React.memo(Footer);