import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axiosInstance.post("ticket/register/", formData);
        if (response.status === 201) {
          toast.success("Registration successful! Please log in.");
          navigate("/login")
          
        }
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
          toast.error(
            error.response.data.detail ||
              "An error occurred during registration."
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-heading font-bold text-3xl font-heading text-foreground">
            Create Account
          </h2>
          <p className="mt-2 text-lg text-body text-accent">
            Sign up to get started
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
                htmlFor="email"
                className="block text-sm font-body text-foreground"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaEnvelope className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-input rounded-md shadow-sm placeholder-accent/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-red-600 text-sm text-destructive">
                  {errors.email}
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

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-body text-foreground"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-input rounded-md shadow-sm placeholder-accent/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="********"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-accent" />
                  ) : (
                    <FaEye className="h-5 w-5 text-accent" />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="mt-2 text-red-600 text-sm text-destructive">
                  {errors.confirm_password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-body text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-accent">
          Already have an account?{" "}
          <span className="text-blue-800">
            <Link to={"login"}>Sign in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
