import { useEffect, useState } from "react";
import { handleTokenExpiry } from "../../utils/isAuth";
import Loader from "../Loader";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminAuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  console.log("location", location);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await handleTokenExpiry();
        const decodedToken = jwtDecode(token);

        if (decodedToken.is_admin) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        setIsAuthenticated(false);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    // Redirect to admin page if authenticated as admin
    return <Navigate to="/login" />;
  }

  // Render children if not authenticated as admin
  return <>{children}</>;
};

export default AdminAuthWrapper;
