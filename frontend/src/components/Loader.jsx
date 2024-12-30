import React from "react";

const Loader = ({
  size = "medium",
  color = "primary",
  text = "Loading...",
  loading = true,
}) => {
  if (!loading) return null;

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
    destructive: "border-destructive",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-background to-muted"
      role="status"
      aria-busy="true"
    >
      <div className="p-8 bg-card rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <div
          className={`
            ${sizeClasses[size] || sizeClasses.medium}
            border-4
            ${colorClasses[color] || colorClasses.primary}
            border-t-transparent
            rounded-full
            animate-spin
          `}
        />
        {text && (
          <p className="mt-2 text-body font-body text-accent-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
