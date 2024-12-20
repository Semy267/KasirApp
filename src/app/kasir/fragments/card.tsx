import { Product } from "@/API/products";
import { CldImage } from "next-cloudinary";
export default function Card({
  Products,
  addToCart,
}: {
  Products: Product[];
  addToCart: (product: Product) => void;
}) {
  function badge(text: string) {
    switch (text) {
      case "BARU":
        return "badge-primary";
      case "VIRAL":
        return "badge-secondary";
      case "TERLARIS":
        return "badge-warning";
      case "LEGEND":
        return "badge-error";
      default:
        return "badge-warning";
    }
  }
  return (
    <>
      {Products.map((product) => (
        <div
          className="card bg-base-100 w-96 shadow-xl hover:-translate-y-2 smooth_transition"
          onClick={() => addToCart(product)}
          key={product.id}
        >
          <figure>
            <CldImage
              src={product.image} // Use this sample image or upload your own via the Media Explorer
              width="500" // Transform the image: auto-crop to square aspect_ratio
              height="500"
              alt={product.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {product.name}
              <div className={`badge ${badge(product.badge)}`}>
                {product.badge}
              </div>
            </h2>
            <p>{product.desc}</p>
            <div className="card-actions justify-end">
              <h1 className="text-2xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
