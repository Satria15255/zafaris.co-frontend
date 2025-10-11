import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
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
    navigate("zafaris.co");
    toast.success("Logout");
  };
  return (
    <div className="fixed top-0 right-0 w-1/5 h-full bg-gray-900 text-white z-50 p-6 shadow-l">
      <ul className="space-y-3">
        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Zafaris.co</h2>
            <li>
              <button onClick={() => handleNavigate("zafaris.co/login")} className="hover:text-gray-300">
                Login
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("zafaris.co/register")} className="hover:text-gray-300">
                register
              </button>
            </li>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6"> Hello {user.name}!</h2>
            <div className="space-y-2 font-bold">
              <li className="border-b pb-2">
                <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 ">
                  <FaShoppingCart />
                  <span>Shopping Cart</span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link to="/zafaris.co/orders" className="flex items-center gap-2 hover:text-gray-300">
                  <FaCreditCard />
                  <span>My Orders</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </li>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
