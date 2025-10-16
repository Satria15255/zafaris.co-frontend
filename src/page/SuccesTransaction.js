import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getNewTransactions, getAllProducts } from "../api";

const SuccesTransaction = ({ onOpenModal }) => {
  const [latestOrder, setlatestOrder] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: order } = await getNewTransactions();
        setlatestOrder(order);

        const { data: products } = await getAllProducts();
        const shuffled = products.sort(() => 0.5 - Math.random());
        setRecommended(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed get succes transaction", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-600">🎉 Transaksi Berhasil!</h1>

      {latestOrder ? (
        <div className="mb-8 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🧾 Rincian Pesanan:</h2>
          <p className="flex justify-between">
            <strong>ID Transaksi:</strong>
            <p>{latestOrder._id}</p>
          </p>
          <p className="flex justify-between">
            <strong>Status:</strong> {latestOrder.status}
          </p>
          <p className="flex justify-between">
            <strong>Total Harga:</strong> ${latestOrder.totalPrice}
          </p>
          <p className="flex justify-between">
            <strong>Alamat Pengiriman:</strong> {latestOrder.shippingAddress}
          </p>
          <div className="mt-3">
            <h3 className="font-semibold">Produk:</h3>
            {latestOrder.products && latestOrder.products.length > 0 ? (
              <ul className="list-disc list-inside border-t mt-1">
                {latestOrder.products.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mt-3 border-b pb-3">
                      <div className="flex items-center">
                        <img src={item.product.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                        <p className="text-xl font-bold">{item.product.name} </p>
                      </div>
                      <p>
                        Size:<span className="font-bold">{item.size}</span>{" "}
                      </p>
                      <p>
                        Quantity: <span className="font-bold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p>Tidak ada product</p>
            )}
          </div>
        </div>
      ) : (
        <p>Memuat detail transaksi...</p>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">Rekomendasi Produk untuk Kamu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-4 gap-4">
          {recommended.map((product) => (
            <ProductCard key={product._id} product={product} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccesTransaction;
