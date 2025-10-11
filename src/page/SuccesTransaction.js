import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const SuccesTransaction = () => {
  const [latestOrder, setlatestOrder] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data: order } = await axios.get("http://localhost:5000/api/transactions/latest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setlatestOrder(order);

        const { data: products } = await axios.get("http://localhost:5000/api/products");
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
          <p>
            <strong>ID Transaksi:</strong> {latestOrder._id}
          </p>
          <p>
            <strong>Status:</strong> {latestOrder.status}
          </p>
          <p>
            <strong>Total Harga:</strong> Rp {latestOrder.totalPrice}
          </p>
          <p>
            <strong>Alamat Pengiriman:</strong> {latestOrder.shippingAddress}
          </p>
          <div className="mt-3">
            <h3 className="font-semibold">Produk:</h3>
            {latestOrder.products && latestOrder.products.length > 0 ? (
              <ul className="list-disc list-inside">
                {latestOrder.products.map((item, i) => (
                  <li key={i}>
                    {item.product.name} - Ukuran: {item.size} - Jumlah: {item.quantity}
                  </li>
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
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccesTransaction;
