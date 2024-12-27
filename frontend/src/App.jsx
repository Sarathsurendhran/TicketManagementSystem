import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./components/SignUp";
import LoginPage from "./components/login";
import TicketManagement from "./components/DashBoard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/dashboard" element={<TicketManagement/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
