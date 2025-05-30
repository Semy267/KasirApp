import { db } from "@/lib/database/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function Card({
  children,
  table,
  total,
  id,
}: {
  children: React.ReactNode;
  table: string;
  total: number;
  id: string;
}) {

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, "pesanan", id));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{table}</h2>
        {children}
        <div className="card-body justify-end pt-5">
          <h1 className="text-lg">
            Total:{" "}
            <span className="text-xl">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(total)}
            </span>
          </h1>
          <button className="btn btn-primary w-full" onClick={() => handleDeleteOrder(id)}>Selesai</button>
        </div>
      </div>
    </div>
  );
}
