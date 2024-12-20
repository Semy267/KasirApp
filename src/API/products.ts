import { db } from "@/lib/database/firebase";
import { collection, getDocs, query, where, Query } from "firebase/firestore";
export interface Product {
  name: string;
  price: number;
  image: string;
  desc: string;
  type: string;
  id: string;
  badge: string;
}

export async function fetchProducts(type?: string): Promise<Product[]> {
  let productsQuery: Query = collection(db, "products");

  // Jika ada filter `type`, tambahkan query `where`
  if (type) {
    productsQuery = query(productsQuery, where("type", "==", type));
  }

  const querySnapshot = await getDocs(productsQuery);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ ...(doc.data() as Product), id: doc.id });
  });

  return products;
}
