import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import React from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-bold">⚡</span>
          <h1 className="text-white text-xl font-bold tracking-wide">
            TaskHub
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-white hover:text-indigo-200 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="text-white hover:text-indigo-200 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-500 px-6 pb-4 flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="text-white hover:text-indigo-200"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="text-white hover:text-indigo-200"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
