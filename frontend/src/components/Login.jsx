import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Handle form submission
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
                <p className="mt-2 text-sm text-destructive">{errors.email}</p>
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
                <p className="mt-2 text-sm text-destructive">
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
