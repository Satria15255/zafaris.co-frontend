import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getLatestProducts, getDiscountProducts } from "../api";
import bgProductPages from "../assets/elemen/img/hero3.png";
import { MdAutoAwesome, MdOutlineExpandMore, MdSell, MdSearch } from "react-icons/md";
import FilterMobile from "../components/FilterMobile";
import FilterSidebar from "../components/FilterSidebar";

function ProductPages({ onAddToCart, onOpenModal }) {
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [currentPages, setCurrentPages] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    category: "All",
    size: "All",
    search: "",
    latest: false,
    discount: false,
  });
  const productsPerPage = 12;
  const categories = ["All", "Basketball", "Sneakers", "Running", "Casual"];
  const size = ["All", 38, 39, 40, 41, 42, 43, 44];

  // Function Fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function Fetch New Arrival Products
  const fetchLatestProducts = async () => {
    try {
      const res = await getLatestProducts();
      console.log(res.data);
      setLatestProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLatestProducts();
  }, []);

  // Function Fetch Discount Products
  const normalizeDiscount = (discount) => {
    return {
      ...discount.productId,
      isDiscount: true,
      discountPercent: discount.discountPercent,
      discountPrice: discount.discountPrice,
      expiresAt: discount.expiresAt,
    };
  };

  const fetchDiscountProducts = async () => {
    try {
      const res = await getDiscountProducts();
      const normalized = res.data.map(normalizeDiscount);
      console.log(res.data);
      setDiscountProducts(normalized);

      setProducts((prev) =>
        prev.map((p) => {
          const found = normalized.find((d) => d._id === p._id);
          return found ? found : p;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDiscountProducts();
  }, []);

  // Function Filter Products
  useEffect(() => {
    if (filter.discount && filter.latest) {
      setFilter((prev) => ({ ...prev, latest: false }));
    }
  });

  const filterProducts = () => {
    const source = filter.discount ? discountProducts : filter.latest ? latestProducts : products || [];
    return source.filter((products) => {
      const matchCategory = filter.category === "All" || products.category === filter.category;
      const matchSize = filter.size === "All" || (Array.isArray(products.sizes) && products.sizes.includes(Number(filter.size)));
      const matchSearch = filter.search.trim() === "" || products.name.toLowerCase().includes(filter.search.toLocaleLowerCase());
      return matchCategory && matchSize && matchSearch;
    });
  };
  const filteredProducts = filterProducts();

  // Function Products Pagination
  useEffect(() => {
    setCurrentPages(1);
  }, [filter.category, filter.size, filter.latest, filter.discount, filter.search]);
  const indexOfLast = currentPages * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="mt-12 p-1 md:p-2">
      <div style={{ backgroundImage: `url(${bgProductPages})` }} className="z-0 flex flex-col justify-between items-center h-[30vh] md:h-[60vh] bg-center bg-cover rounded-lg md:rounded-3xl mb-2 md:mb-4">
        <div className="bg-transparant font-light ml-5">.</div>
        <p className="text-2xl md:text-8xl font-bold text-white">Product</p>
        <div className="w-4/5 md:w-[180vh] rounded-t-2xl bg-white flex justify-between items-center h-[6vh] md:h-[9vh] px-3">
          <p className="font-bold text-xs md:text-lg">Give All You Want</p>
          <div className="flex w-1/5">
            <input type="text" placeholder="🔍 Search Products..." value={filter.search} onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))} className="w-full h-[5vh] text-sm rounded-full" />
            <p className="flex items-center text-xl">
              <MdSearch />
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row w-[100vh] md:w-[180vh] px-2">
          {/* Sidebar Filter */}
          <FilterSidebar categories={categories} size={size} filter={filter} setFilter={setFilter} />

          {/* Filter Mobile Version */}
          <button onClick={() => setFilterOpen(true)}>Filter</button>
          {/* Products Section */}
          <div className="flex flex-col">
            <div className="grid grid-cols-2 items-center md:grid-cols-3 gap-3">
              {currentProducts.length === 0 && <p className="text-center col-span-3">No products found.</p>}
              {currentProducts.length > 0 && currentProducts.map((products) => <ProductCard key={products._id} product={products} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />)}
            </div>
            <div className="flex justify-between w-full py-4">
              <button className="font-semibold text-lg w-25 rounded h-[5vh] hover:shadow-md transition duration-200" onClick={() => setCurrentPages((prev) => Math.max(prev - 1, 1))} disabled={currentPages === 1}>
                ← Previous
              </button>
              <div>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPages(idx + 1)}
                    className={`px-3 py-1 rounded hover:bg-gray-100 hover: font-bold transition-all duration-300 ease-in-out ${currentPages === idx + 1 ? "font-bold bg-gray-100" : ""}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button className="font-semibold text-lg w-25 rounded h-[5vh] hover:shadow-md transition duration-200" onClick={() => setCurrentPages((prev) => Math.min(prev + 1, totalPages))} disabled={currentPages === totalPages}>
                Next →
              </button>
            </div>
          </div>

          {filterOpen && <FilterMobile open={filterOpen} onClose={() => setFilterOpen(false)} categories={categories} sizes={size} currentFilter={filter} onApply={(newFilter) => setFilter(newFilter)} />}
        </div>
      </div>
    </div>
  );
}

export default ProductPages;
