import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate()
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log(password);
    const res = await axios.post("http://localhost:3000/login", {
      name,
      password,
    });

    if (!res.data.success) {
      
      return alert(res.data.message);
    }

    // success
    localStorage.setItem("token", res.data.token);
    alert(res.data.message);
    navigate("/");
  } catch (error) {
    alert(error.response.data.message);
    console.log(error.message);
  }
};

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="shadow-2xl p-10 rounded-2xl bg-white w-[420px]">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Username"
          />
          <input
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
          />
          <button
         
            className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-3 rounded-lg transition duration-200"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 flex justify-between text-sm text-gray-500">
         
          <a href="/register" className="hover:text-blue-600 transition">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
