import React from "react";
import NavbarSection from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ cartCount, onCartClick, onToggleSidebar }) => {
  return (
    <>
      <NavbarSection onToggleSidebar={onToggleSidebar} cartCount={cartCount} onCartClick={onCartClick} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
