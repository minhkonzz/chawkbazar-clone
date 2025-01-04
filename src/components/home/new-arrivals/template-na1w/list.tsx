"use client";

import { useState, useEffect } from "react";
import type { Product as SerializedProduct } from "@/shared/types/entities";
import { getNewArrivalProductsSnapShot } from "@/lib/firebase/firestore/product";
import Product from "@/components/product/template-p1w";
import styles from "./styles.module.css";

export default function NewArrivalProductsList({
   initialProducts
}: {
   initialProducts: SerializedProduct[];
}) {
   const [products, setProducts] = useState<SerializedProduct[]>(initialProducts);

   useEffect(() => {
      const unsub = getNewArrivalProductsSnapShot(products => {
         setProducts(products);
      });
      return () => unsub();
   }, []);

   return products.map((item: SerializedProduct, i: number) => (
      <div
         key={item?.id}
         style={{ animationDelay: `${i * .1}s` }}
         className={`${styles.item} item-fadein`}>
         <Product
            wImage={352}
            hImage={452}
            product={item}
         />
      </div>
   ));
}
