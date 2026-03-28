import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/privateRoute";
import AIChat from "./components/AIChat";

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar onChatOpen={() => setChatOpen(true)} />
        <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        <ToastContainer position="top-right" autoClose={2000} />

        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Page */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
