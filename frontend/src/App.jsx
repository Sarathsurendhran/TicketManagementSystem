import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./components/SignUp";
import LoginPage from "./components/login";
import TicketManagement from "./components/DashBoard";
import {Toaster} from "react-hot-toast";
import AdminTicketManagement from "./components/Admin/AdminTicketManagement";


function App() {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/dashboard" element={<TicketManagement/>}></Route>
          <Route path="/admin" element={<AdminTicketManagement/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
