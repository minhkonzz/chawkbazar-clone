"use client"

import { useState, useEffect } from "react";
import type { Product as SerializedProduct } from "@/shared/types/entities";
import { getFlashSaleProductsSnapShot } from "@/lib/firebase/firestore/product";
import styles from "./styles.module.css";
import Product from "@/components/product/template-p1w";

export default function FlashSaleList({
   initialProducts
}: {
   initialProducts: SerializedProduct[];
}) {
   const [products, setProducts] = useState<SerializedProduct[]>(initialProducts);

   useEffect(() => {
      const unsub = getFlashSaleProductsSnapShot((products: SerializedProduct[]) => {
         setProducts(products);
      });

      return () => unsub();
   }, []);

   return products.map((e: SerializedProduct, i: number) => (
      <div
         key={e?.id}
         className={`${styles.item} item-fadein`}
         style={{ animationDelay: `${i * 0.1}s` }}>
         <Product
            wImage={324}
            hImage={324}
            imagePath={e.image.pmd}
            product={e}
         />
      </div>
   ));
}