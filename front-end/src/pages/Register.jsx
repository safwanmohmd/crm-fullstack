import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await axios.post("http://localhost:3000/register", {
        name,
        password,
      });

      if (!res.data.success) {
        return alert(res.data.message);
      }

      // Save token & redirect
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-green-200">
      <div className="shadow-2xl p-10 rounded-2xl bg-white w-[420px]">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Password"
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            className="bg-green-500 shadow-md text-white font-semibold hover:bg-green-600 py-3 rounded-lg transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <a
            href="/login"
            className="hover:text-green-600 transition"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
