import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav
      className={`flex justify-between items-center p-4 mb-5 flex-wrap gap-2
        ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-gray-100"}`}
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      <div className="flex gap-5 flex-wrap">
        <Link
          to="/"
          className={`px-3 py-2 rounded transition 
            ${theme === "light" ? "text-gray-800 hover:bg-gray-100" : "text-gray-200 hover:bg-gray-700"}`}
        >
          Home
        </Link>
        <Link
          to="/add-user"
          className={`px-3 py-2 rounded transition 
            ${theme === "light" ? "text-gray-800 hover:bg-gray-100" : "text-gray-200 hover:bg-gray-700"}`}
        >
          Add User
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-full cursor-pointer transition
          ${theme === "light" ? "bg-gray-200 text-gray-900 hover:bg-gray-300" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
};

export default NavBar;
