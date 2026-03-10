import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold tracking-wide">TaskHub</h1>

        {/* Links */}
        <div className="flex items-center gap-6">
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
      </div>
    </nav>
  );
}

export default Navbar;
