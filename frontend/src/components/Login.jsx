import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Redux/AuthenticatedUserSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axiosInstance.post("ticket/login/", formData);
        if (response.status === 200) {
          toast.success("Login Success");
          localStorage.setItem("token", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);

          const decodedToken = jwtDecode(response.data.access);

          dispatch(
            setUser({
              username: decodedToken.username,
              email: decodedToken.email,
              isAdmin: decodedToken.is_admin,
            })
          );

          // Check if the user is an admin and navigate accordingly
          if (decodedToken.is_admin) {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
        setFormData({
          username: "",
          password: "",
        });
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data.detail);
          toast.error(
            error.response.data.detail || "An error occured during login"
          );
        } else {
          toast.error("Network error. Please try again later.");
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-heading font-heading text-foreground text-3xl font-bold  text-foreground">
            Welcome Back
          </h2>
          <p className=" text-lg   mt-2 text-body text-accent">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-body text-foreground"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaUser className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-input rounded-md shadow-sm placeholder-accent/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="User Name"
                  value={formData.username}
                  onChange={handleChange}
                  aria-label="Full Name"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-red-600 text-sm text-destructive">
                  {errors.username}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-body text-foreground"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-input rounded-md shadow-sm placeholder-accent/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-accent" />
                  ) : (
                    <FaEye className="h-5 w-5 text-accent" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-red-600 text-sm text-destructive">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-body text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-accent">
          Don't have an account?{" "}
          <span className="text-blue-800">
            <Link to={"/"}>Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
