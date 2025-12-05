import { Navigate } from "react-router-dom";
 
export default function PrivateRoute({ children }) { 
  const token = localStorage.getItem("token");
 
  // if no token redirect to login
  if (!token) {
    return <Navigate to="/Userlogin" replace/>;
  }
  return children;
}
