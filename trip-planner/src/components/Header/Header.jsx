// src/components/Header/Header.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const toggleMenu = () => setMenuOpen((o) => !o);
  const toggleDropdown = () => setDropdownOpen((o) => !o);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("user");
    // Optionally clear cookie / call backend logout endpoint here
    navigate("/");
  };

  // Common link styling as pill buttons
  const linkClasses =
    "px-4 py-2 rounded-full font-medium transition-colors hover:bg-indigo-500 hover:text-white";

  return (
    <header className="fixed top-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-indigo-400">
            <a href="/"> Trip<span className="text-green-400">Planner</span></a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-3 text-gray-300">
          {!currentUser ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`${linkClasses} bg-indigo-600 text-white`}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`${linkClasses} bg-green-600 text-white`}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/my-trips")}
                className={`${linkClasses} bg-gray-700`}
              >
                My Trips
              </button>
              <button
                onClick={() => navigate("/create-trip")}
                className={`${linkClasses} bg-indigo-600 text-white`}
              >
                Create Trip +
              </button>

              {/* Avatar / Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="ml-2 text-gray-300 hover:text-white transition"
                >
                  <UserCircle size={28} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-2">
                    <p className="px-4 py-1 text-sm text-gray-200">
                      {currentUser.username}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-95 text-gray-300">
          <nav className="flex flex-col items-center space-y-4 py-6">
            {!currentUser ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className={`${linkClasses} bg-indigo-600 text-white`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className={`${linkClasses} bg-green-600 text-white`}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/my-trips");
                    setMenuOpen(false);
                  }}
                  className={`${linkClasses} bg-gray-700`}
                >
                  My Trips
                </button>
                <button
                  onClick={() => {
                    navigate("/create-trip");
                    setMenuOpen(false);
                  }}
                  className={`${linkClasses} bg-indigo-600 text-white`}
                >
                  Create Trip +
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className={`${linkClasses} bg-red-600 text-white`}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
