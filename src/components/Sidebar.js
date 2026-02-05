import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaCreditCard, FaSignOutAlt, FaSignInAlt, FaHome, FaBoxes } from "react-icons/fa";
import { CircleUser } from "lucide-react";

import { toast } from "react-toastify";

const Sidebar = ({ user, onLogout, closeSidebar }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    closeSidebar?.();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
    toast.success("Logout Successfully");
  };
  return (
    <div className="fixed top-0 right-0 w-1/2 md:w-1/5 h-full bg-gray-900 text-white z-50 md:p-6 shadow-l">
      <ul className="md:space-y-3">
        {!user ? (
          <>
            <h2 className="text-[15px] text-center md:text-2xl font-bold py-3 border-b border-gray-500">
              Zafaris<span className="text-yellow-500">.co</span>
            </h2>
            <button onClick={() => handleNavigate("/products")} className="flex items-center text-sm space-x-1 md:text-lg hover:text-gray-300 py-2 px-1 mt-1">
              <FaBoxes />
              <span>Product</span>
            </button>
            <button onClick={() => handleNavigate("/login")} className="flex items-center space-x-1 text-sm md:text-lg hover:text-gray-300 py-2 px-1 mt-1 ">
              <FaSignInAlt />
              <span>Login</span>
            </button>
            <button onClick={() => handleNavigate("/register")} className="flex items-center space-x-1 text-sm md:text-lg hover:text-gray-300 py-2 px-1 ">
              <FaUserPlus />
              <span>Register</span>
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center items=center py-2">
              <CircleUser />
            </div>
            <h2 className="text-[15px] text-center md:text-lg lg:text-2xl font-bold pb-3 border-b border-gray-500"> Hello {user.name}!</h2>
            <button onClick={() => handleNavigate("/")} className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1">
              <FaHome />
              <span>Home</span>
            </button>
            <button onClick={() => handleNavigate("/products")} className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1">
              <FaBoxes />
              <span>Product</span>
            </button>
            <button onClick={() => handleNavigate("/orders")} className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1">
              <FaCreditCard />
              <span>My Orders</span>
            </button>
            <button onClick={handleLogout} className="flex font-bold text-sm items-center gap-2 hover:text-red-400 py-2 px-1">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
