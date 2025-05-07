import { useParams } from "react-router-dom";
import products from "../data/product";
import { Eye, ShoppingCart } from "lucide-react";

const ProductPage = ({ onAddToCart, onOpenModal }) => {
  const { category } = useParams();

  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-capitalize">Kategori : {category}</h1>

      {filteredProducts.length === 0 ? (
        <p>Tidak ada product di Kategori ini</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div className="grid grid-rows-2 max-w-xs bg-white rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className=" w-full h-auto object-cover" />
              <div className="grid justify-content-center">
                <p className="grid justify-content-center items-center text-xl md:text-sm lg:text-xl   font-semibold py-3">{product.name}</p>
                <p className="grid justify-content-center text-xl items-center">${product.price.toFixed(2)}</p>
                <div className="mt-auto flex items-end justify-content-center ">
                  <button onClick={() => onAddToCart(product)} className="flex justify-content-center w-20 py-2 border border-black-500 hover:bg-black hover:text-white transition rounded-l-full">
                    <ShoppingCart className=" stroke-current transition-colors" />
                  </button>
                  <button onClick={() => onOpenModal(product)} className="flex justify-content-center w-20 py-2 border border-black-200 hover:bg-black hover:text-white transition rounded-r-full">
                    <Eye className="stroke-current transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
