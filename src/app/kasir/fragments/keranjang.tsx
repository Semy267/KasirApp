"use client";
import { Product } from "@/API/products";
import { CldImage } from "next-cloudinary";

export default function Keranjang({ cart }: { cart: Product[] }) {
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
                <div className="flex items-center rounded-full px-2 py-1 bg-warning">
                    1
                </div>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <CldImage
                        src={product.image} // Use this sample image or upload your own via the Media Explorer
                        width="500" // Transform the image: auto-crop to square aspect_ratio
                        height="500"
                        alt="cld-sample-5"
                        crop={{
                          type: "auto",
                          source: true,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold line-clamp-2">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)}
                <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
