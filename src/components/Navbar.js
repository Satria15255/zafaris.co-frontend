import { Nav } from "react-bootstrap";
import { AlignJustify, ShoppingCart, CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavbarSection({cartCount, onToggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      className={`fixed top-0 z-20 md:px-4 py-2 md:py-3 flex justify-around items-center w-full transition-all duration-500 ease-in-out
  ${scrolled ? " shadow-md rounded-b-xl bg-white" : "bg-white"}`}
    >
      <Container fluid>
        <p onClick={() => navigate("/")} className="font-semibold font-sans md:flex text-sm md:text-xl lg:text-2xl md:px-3">
          Zafaris<span className="text-yellow-500">.Co</span>
        </p>
        <Nav className="font-semibold space-px-5  mx-auto gap-2 hidden md:flex justify-center">
          <p onClick={() => navigate("/")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
            Home
          </p>
          <p onClick={() => navigate("/products")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
            Product
          </p>
        </Nav>
        <div className="flex items-center">
          <button onClick={() => navigate("/cart")} className="relative px-2 hover:text-yellow-500 transition duration-100">
            <ShoppingCart />
            {cartCount > 0 && <span className="absolute top-2 right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>}
          </button>
          <button onClick={onToggleSidebar} className="relative hidden md:flex px-2 hover:text-yellow-500 transition duration-100">
            <CircleUser />
          </button>
          {/* Hamburger icon */}
          <button onClick={onToggleSidebar} className="relative md:hidden   px-2 hover:text-yellow-500 transition duration-100">
            <AlignJustify />
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarSection;
