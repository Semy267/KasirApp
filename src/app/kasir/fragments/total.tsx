import { Product } from "@/API/products";

export default function TotalHarga({
  cart,
  handleBayar,
  setSelectedTable,
  selectedTable,
}: {
  cart: Product[];
  handleBayar: () => void;
  setSelectedTable: (table: string) => void;
  selectedTable: string;
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  return (
    <div className="w-full absolute bottom-36 right-0 shadow-xl px-2 py-4 rounded-xl flex flex-col gap-4">
      <select className="select select-warning w-full" defaultValue={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option disabled value={"Pilih Meja"}>
          Pilih Meja
        </option>
        <option>Meja 01</option>
        <option>Meja 02</option>
        <option>Meja 03</option>
        <option>Meja 04</option>
        <option>Meja 05</option>
        <option>Meja 06</option>
        <option>Meja 07</option>
      </select>
      <h1 className="text-xl">
        Total :{" "}
        <span className="font-semibold text-2xl">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(total)}
        </span>
      </h1>
      <button className="btn btn-warning w-full" onClick={handleBayar}>
        Bayar
      </button>
    </div>
  );
}
