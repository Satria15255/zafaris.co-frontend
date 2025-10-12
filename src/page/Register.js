import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });

      toast.success("Register success, please Login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800">
      <div className="w-2/5 h-auto border bg-white rounded-xl p-4 mx-auto mt-10">
        <button
          onClick={() => {
            navigate("/zafaris.co");
          }}
          className="text-gray-500 -mt-6 text-lg hover:text-gray-700 text-xl font-bold top-0"
        >
          ×
        </button>
        <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center">
          <input type="text" placeholder="Name" value={name} className="w-full rounded-lg p-2 border" onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} className="w-full rounded-lg p-2 border" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} className="w-full rounded-lg p-2 border" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="border border-black hover:bg-gray-900 hover:text-white transition duration-100 px-4 py-2 rounded">
            Register
          </button>
        </form>
        <div className="flex flex-col items-center mt-4 space-y-3">
          <p className="text-center">Already have an account?</p>
          <button
            onClick={() => {
              navigate("/zafaris.co/login");
            }}
            className="text-gray-900 text-center hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
