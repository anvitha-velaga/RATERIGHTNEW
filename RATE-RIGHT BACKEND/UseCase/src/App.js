import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import UserLogin from "./Pages/User/UserLogin";
import UserRegister from "./Pages/User/UserRegister";
import UserDashboard from "./Pages/User/UserDashboard";
import SubmittedFeedbacks from "./Pages/User/SubmittedFeedbacks";
import SubmitFeedback from "./Pages/User/SubmitFeedback";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AllUsers from "./Pages/Admin/AllUsers";
import PendingFeedbacks from "./Pages/Admin/PendingFeedbacks";
import FetchUsers from "./Pages/Admin/FetchUsers";
import ApprovedFeedbacks from "./Pages/Admin/ApprovedFeedbacks";
import './axiosConfig';
import Footer from "./Footer";
import './App.css'
import PrivateRoute from "./ProtectRoutes";
import ViewStatus from "./Pages/User/ViewStatus";

function App() {
  return (
    <div>  
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<SplashScreen />}/>
    <Route path='/UserLogin' element={<UserLogin/>}/>
    <Route path="/UserRegister" element={<UserRegister/>}/>
    <Route path='/UserDashboard' element={<PrivateRoute><UserDashboard/></PrivateRoute>}/>
    <Route path="/SubmittedFeedbacks" element={<SubmittedFeedbacks/>}/>
    <Route path="/SubmitFeedback" element={<SubmitFeedback/>} />
    <Route path='/AdminDashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>}/>
    <Route path="/AllUsers" element={<AllUsers />} ></Route>
    <Route path="/PendingFeedbacks" element={<PendingFeedbacks/>}/>
     <Route path="/ViewStatus" element={<ViewStatus/>}/>
    <Route path="/FetchUsers" element={<FetchUsers/>}/>
    <Route path="/ApprovedFeedbacks" element={<ApprovedFeedbacks/>}/>
    <Route path="*" element={<div>404 Not Found</div>}/>
   </Routes>
   </BrowserRouter>
    <Footer />
    </div>
  );
}
export default App;
