"use client";
import { Product } from "@/API/products";
import { IconChevronLeft, IconTrash } from "@tabler/icons-react";

export default function Keranjang({
  cart,
  updateCart,
}: {
  cart: Product[];
  updateCart: (products: Product[]) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Produk</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <th>
                <div className="flex gap-1 items-center">
                  <IconChevronLeft
                    stroke={2}
                    onClick={() => {
                      if (product.quantity && product.quantity > 1) {
                        updateCart(
                          cart.map((item) =>
                            item.id === product.id
                              ? { ...item, quantity: item.quantity! - 1 }
                              : item
                          )
                        );
                      } else {
                        updateCart(cart.filter((item) => item.id !== product.id));
                      }
                    }}
                  />
                  {product.quantity}
                </div>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold line-clamp-2">{product.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price * (product.quantity || 1))}
                <br />
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <IconTrash stroke={2} onClick={() => updateCart(cart.filter((item) => item.id !== product.id))} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
