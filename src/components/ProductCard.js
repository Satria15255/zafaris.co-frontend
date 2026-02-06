import { motion } from "framer-motion";

function ProductCard({ product, onOpenModal }) {
  const { discountPercent, discountPrice } = product;

  const isDiscount = discountPercent && discountPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
      whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
      transition={{ duration: 1.0 }} // Animasi selama 1 detik
      viewport={{ once: true }}
    >
      <div onClick={() => onOpenModal(product)} className="flex flex-col justify-around max-w-lg lg:h-[80vh]  backdrop-blur-md hover:shadow-lg transition duration-300 backdrop-blur-md lg:rounded-3xl overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-auto md:w-40 md:h-55 lg:w-80 lg:h-80 object-cover rounded-md md:rounded-xl md:rounded-bottom-5 object-center" />
        <div className="flex flex-col justify-around mt-2 md:mt-4 p-2">
          <div className="flex items-center">
            <p className="text-sm md:text-[10px] lg:text-lg h-[40px] max-w-md font-semibold ">{product.name}</p>
          </div>
          <div className="flex h-[40px] items-center">
            {isDiscount ? (
              <div className="flex gap-1">
                <p className=" text-sm lg:text-lg line-through">${product.price.toFixed(2)}</p>
                <p className="text-sm lg:text-lg text-yellow-500 font-bold">${discountPrice.toFixed(2)}</p>
              </div>
            ) : (
              <>
                <p className="text-sm lg:text-lg text-yellow-500 font-bold">${product.price.toFixed(2)}</p>
              </>
            )}
          </div>
          <div className="flex gap-1">
            <button className="w-1/2 py-2 text-[10px] md:text-[10px] lg:text-sm border rounded-3xl hover:bg-black hover:text-white transition duration-100">Add to Cart</button>
            <button className="w-1/2 py-2 text-[10px] md:text-[10px] lg:text-sm border rounded-3xl text-gray-100 bg-gray-900 hover:bg-white hover:text-black transition duration-100">Buy Now</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
