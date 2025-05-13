import { motion } from "framer-motion";
import { Eye, ShoppingCart } from "lucide-react";

function ProductCard({ product, onAddToCart, onOpenModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
      whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
      transition={{ duration: 1.0 }} // Animasi selama 1 detik
      viewport={{ once: true }}
    >
      <div className="grid grid-rows-2 max-w-xs bg-white rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className=" w-full h-auto object-cover" />
        <div className="grid justify-content-center">
          <p className="grid justify-content-center items-center text-xl md:text-sm lg:text-xl   font-semibold py-3">{product.name}</p>
          <p className="grid justify-content-center text-xl items-center">${product.price.toFixed(2)}</p>
          <div className="mt-auto flex items-end justify-content-center ">
            <button onClick={() => onOpenModal(product)} className="flex justify-content-center w-20 py-2 border border-black-500 hover:bg-black hover:text-white transition rounded-l-full">
              <ShoppingCart className=" stroke-current transition-colors" />
            </button>
            <button onClick={() => onOpenModal(product)} className="flex justify-content-center w-20 py-2 border border-black-200 hover:bg-black hover:text-white transition rounded-r-full">
              <Eye className="stroke-current transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
