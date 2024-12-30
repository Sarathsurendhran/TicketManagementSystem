import React, { useState } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../Redux/userStore";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { username, email, isAdmin } = useSelector(
    (state) => state.authenticatedUser
  );

  const handleLogout = async () => {
    console.log("Logging out...");

    // Clear all localStorage data
    localStorage.clear();

    // Clear persisted Redux state
    try {
      await persistor.purge();
      console.log("Redux Persist state cleared.");
    } catch (error) {
      console.error("Error clearing Redux Persist state:", error);
    }

    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-br from-primary to-secondary/30  shadow-lg py-4 px-6 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-heading text-3xl font-bold font-heading text-foreground">
          Ticket Management System
        </h1>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="flex items-center space-x-4">
              <span className="text-body font-body text-accent">
                Welcome, {username}
              </span>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-200 transition-colors"
                aria-label="Profile menu"
              >
                <FaUserCircle className="text-2xl text-accent" />
              </button>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-50 rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b border-blue-200">
                  <p className="text-sm font-body text-foreground">{email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-blue-200 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
