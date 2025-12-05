import React from "react";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="footer"
      style={{
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "#ffffff",   
        color: "#1e3a8a",
        fontSize: "14px",
        position: "fixed",
        bottom: 0,
        left: 0,
        borderTop: "1px solid #d1d9f0",
      }} 
    >
      &copy; {year} RATE RIGHT. All rights reserved.
    </footer>
  );
};
export default React.memo(Footer);

