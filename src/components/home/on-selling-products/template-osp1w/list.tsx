"use client"

import { useState, useEffect } from "react";
import type { Product as SerializedProduct } from "@/shared/types/entities";
import { getOnSellProductsSnapShot } from "@/lib/firebase/firestore/product";
import Product from "@/components/product/template-p2d";
import styles from "./styles.module.css";

export default function OnSellingProductsList({
   initialProducts
}: {
   initialProducts: SerializedProduct[]
}) {
   const [products, setProducts] = useState<SerializedProduct[]>(initialProducts);

   useEffect(() => {
      const unsub = getOnSellProductsSnapShot((products: SerializedProduct[]) => {
         setProducts(products);
      });

      return () => unsub();
   }, []);

   return products.map((product: SerializedProduct, i: number) => (
      <div
         key={product?.id}
         className={`${styles.item} item-fadein`}
         style={{ animationDelay: `${i * .1}s` }}>
         <Product product={product} />
      </div>
   ));
}