"use client";
import { IconCube } from "@tabler/icons-react";
import Card from "./fragments/card";
import Menu from "./fragments/menu";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "@/API/products";
import Keranjang from "./fragments/keranjang";
import TotalHarga from "./fragments/total";

export default function Kasir() {
  const [Products, setProducts] = useState<Product[]>([]);
  const [type, setType] = useState("makanan");
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(product: Product) {
    setCart((prevCart) => {
      // Cek apakah produk sudah ada di keranjang
      const isExist = prevCart.some((item) => item.id === product.id);
      if (!isExist) {
        return [...prevCart, product];
      }
      return prevCart;
    });
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
          <Keranjang cart={cart} />
          <TotalHarga />
        </div>
      </div>
    </div>
  );
}
