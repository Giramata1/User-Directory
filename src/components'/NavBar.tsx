import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: theme === "light" ? "#ffffff" : "#1a1a1a",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: theme === "light" ? "#333" : "#ddd",
            fontWeight: "500",
            fontSize: "16px",
            padding: "8px 12px",
            borderRadius: "4px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = theme === "light" ? "#f0f0f0" : "#333";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Home
        </Link>
        <Link
          to="/add-user"
          style={{
            textDecoration: "none",
            color: theme === "light" ? "#333" : "#ddd",
            fontWeight: "500",
            fontSize: "16px",
            padding: "8px 12px",
            borderRadius: "4px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = theme === "light" ? "#f0f0f0" : "#333";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Add User
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        style={{
          background: theme === "light" ? "#f0f0f0" : "#333",
          border: "none",
          padding: "8px 16px",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          color: theme === "light" ? "#333" : "#ddd",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "background 0.2s, transform 0.1s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
};

export default NavBar;