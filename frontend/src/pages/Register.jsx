import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Registration successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-indigo-600 text-white w-full py-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
