"use client";
import Card from "./fragments/card";
import Table from "./fragments/table";
import Navbar from "./fragments/navbar";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/database/firebase";

export default function Dapur() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "pesanan"), orderBy("createdAt", "asc")); // Urutkan berdasarkan createdAt
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });

    // Bersihkan listener saat komponen unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-h-screen m-auto px-2">
        <Navbar />
      <div className="pt-24 flex flex-wrap gap-4">
        {orders.map((order, index) => (
          <Card key={index} table={order.meja} total={order.total} id={order.id}>
              <Table items={order.items} />
          </Card>

        ))}
      </div>
    </div>
  );
}
