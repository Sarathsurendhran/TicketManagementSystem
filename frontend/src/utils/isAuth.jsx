import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { setUser } from "../Redux/AuthenticatedUserSlice";
import store from "../Redux/userStore";

const API_URL = import.meta.env.VITE_API_URL;

// Function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;

    // Update local storage with the new token
    localStorage.setItem("token", newAccessToken);

    // Decode the token to extract user details
    const decodedToken = jwtDecode(newAccessToken);

    // Dispatch an action to update Redux with user details
    store.dispatch(
      setUser({
        username: decodedToken.username,
        email: decodedToken.email,
        isAdmin: decodedToken.is_admin,
      })
    );

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);

    // Clear local storage on failure
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    return null;
  }
};

// Main function to handle token expiry
export const handleTokenExpiry = async () => {
  let token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    token = await refreshAccessToken();
  }

  return token;
};
