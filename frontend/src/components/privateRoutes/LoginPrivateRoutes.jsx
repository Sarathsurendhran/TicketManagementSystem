import { useEffect, useState } from "react";
import { handleTokenExpiry } from "../../utils/isAuth";
import Loader from "../Loader";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await handleTokenExpiry();

        if (token) {
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

  if (isAuthenticated === true) {
    return <Navigate to="/dashboard" />;
  }

  // Only render children if unauthenticated
  return <>{children}</>;
};

export default AuthWrapper;
