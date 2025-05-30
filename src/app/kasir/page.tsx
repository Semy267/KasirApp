"use client";
import { IconCube } from "@tabler/icons-react";
import Card from "./fragments/card";
import Menu from "./fragments/menu";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "@/API/products";
import Keranjang from "./fragments/keranjang";
import TotalHarga from "./fragments/total";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/database/firebase";
import AlertSucces from "./fragments/alert succes";
import AlertWarning from "./fragments/alert warning";

export default function Kasir() {
  const [Products, setProducts] = useState<Product[]>([]);
  const [type, setType] = useState("makanan");
  const [cart, setCart] = useState<Product[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>("Pilih Meja");

  function addToCart(product: Product) {
    setCart((prevCart) => {
      // Cek apakah produk sudah ada di keranjang
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Tingkatkan jumlah jika sudah ada
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity! + 1 }
            : item
        );
      } else {
        // Tambahkan item baru dengan quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function updateCart(updatedCart: Product[]) {
    setCart(updatedCart);
  }

  async function handlePayment() {
    if (selectedTable === "Pilih Meja") {
      setShowWarning(true);

      // Sembunyikan alert setelah 3 detik
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
      return;
    }
    try {
      const orderData = {
        items: cart.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
        total: cart.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        ),
        meja: selectedTable,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "pesanan"), orderData);
      // Tampilkan alert
      setShowSuccess(true);

      // Sembunyikan alert setelah 3 detik
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      setCart([]); // Kosongkan keranjang
    } catch (error) {
      console.error("Error saat menyimpan pesanan:", error);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    }
  }
  useEffect(() => {
    async function fetchingProducts() {
      const data = await fetchProducts(type);
      setProducts(data);
    }
    fetchingProducts();
  }, [type]);
  return (
    <div className="max-h-screen m-auto px-2 overflow-hidden">
      {showSuccess && <AlertSucces />}
      {showWarning && <AlertWarning/>}
      <div className="navbar rounded-xl shadow-xl bg-base-100 fixed z-10">
        <a className="btn btn-ghost text-xl">
          KasirApp
          <IconCube stroke={2} />
        </a>
      </div>
      <div className="grid grid-cols-[15%_65%_20%] pt-24">
        <div>
          <Menu type={type} setType={setType} />
        </div>
        <div className="flex gap-4 flex-wrap overflow-y-auto pb-28 max-h-screen">
          <Card Products={Products} addToCart={addToCart} />
        </div>
        <div className="relative">
          <Keranjang cart={cart} updateCart={updateCart} />
          <TotalHarga
            cart={cart}
            handleBayar={handlePayment}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
        </div>
      </div>
    </div>
  );
}
