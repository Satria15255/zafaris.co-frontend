import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Login success");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
      console.log(err.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800">
      <div className="w-3/5 md:w-2/5 h-auto border bg-white rounded-xl p-1 md:p-4 mx-auto mt-10">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-gray-500 -mt-6 text-lg hover:text-gray-700 text-xl font-bold top-0"
        >
          ×
        </button>
        <h2 className="text-[12px] md:text-2xl text-center font-bold mb-2 md:mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4 flex px-3 flex-col justify-center">
          <input type="email" placeholder="Email" value={email} className="w-full text-[8px] rounded-lg p-2 border" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} className="w-full text-[8px] rounded-lg p-2 border" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="text-[8px] border border-black hover:text-white hover:bg-gray-900 transition duration-100 font-bold px-4 py-2 rounded">
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-2 md:mt-4">
          <p className="text-center text-[8px]">Don't have an account?</p>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="text-gray-900 text-center text-[8px] mb-3 hover:underline"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
