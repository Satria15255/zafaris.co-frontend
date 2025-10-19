import { motion } from "framer-motion";

function ProductCard({ product, onOpenModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
      whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
      transition={{ duration: 1.0 }} // Animasi selama 1 detik
      viewport={{ once: true }}
    >
      <div onClick={() => onOpenModal(product)} className="flex flex-col justify-between max-w-lg h-90 backdrop-blur-md hover:shadow-lg transition duration-300 backdrop-blur-md lg:rounded-xl overflow-hidden">
        <img src={product.image} alt={product.name} className="w-40 h-40 md:w-55 md:h-55 lg:w-80 lg:h-80 object-cover rounded-md md:rounded-xl md:rounded-bottom-5 object-center" />
        <div className="flex flex-col justify-between mt-4 p-2">
          <p className="text-[12px] md:text-[10px] lg:text-lg h-[40px] font-semibold ">{product.name}</p>
          <p className="text-[9px] mt-2 md:text-[9px] lg:text-sm text-yellow-500 font-bold">${product.price}.00</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
