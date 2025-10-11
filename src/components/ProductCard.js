import { motion } from "framer-motion";

function ProductCard({ product, onOpenModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
      whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
      transition={{ duration: 1.0 }} // Animasi selama 1 detik
      viewport={{ once: true }}
    >
      <div onClick={() => onOpenModal(product)} className="grid max-w-xs h-50 backdrop-blur-md hover:shadow-lg transition duration-300 backdrop-blur-md rounded-xl overflow-hidden">
        <img src={product.image} alt={product.name} className=" w-80 h-80 object-cover rounded-xl rounded-bottom-5 object-center" />
        <div className="p-3">
          <p className="text-xl md:text-sm lg:text-lg font-semibold py-1">{product.name}</p>
          <p className="text-sm text-yellow-500 font-bold">${product.price}.00</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
