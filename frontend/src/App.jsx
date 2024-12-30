import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./components/SignUp";
import LoginPage from "./components/Login";
import TicketManagement from "./components/DashBoard";
import { Toaster } from "react-hot-toast";
import AdminTicketManagement from "./components/Admin/AdminTicketManagement";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/userStore";
import { PersistGate } from "redux-persist/integration/react";
import AuthWrapper from "./components/privateRoutes/LoginPrivateRoutes";
import AdminAuthWrapper from "./components/privateRoutes/AdminPrivateRoute";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route path="/" element={<SignupPage />}></Route>
              <Route
                path="/login"
                element={
                  <AuthWrapper>
                    <LoginPage />
                  </AuthWrapper>
                }
              ></Route>
              <Route path="/dashboard" element={<TicketManagement />}></Route>
              <Route
                path="/admin"
                element={
                  <AdminAuthWrapper>
                    <AdminTicketManagement />
                  </AdminAuthWrapper>
                }
              ></Route>
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
