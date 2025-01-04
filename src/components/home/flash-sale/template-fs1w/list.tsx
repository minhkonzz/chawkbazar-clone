"use client"

import { useState, useEffect } from "react";
import { getFlashSaleSnapShot } from "@/lib/firebase/firestore/product";
import type { FlashSale } from "@/shared/types/entities";
import Product from "@/components/product/template-p1w";
import styles from "./styles.module.css";

export default function FlashSaleList({
   initialSales
}: {
   initialSales: FlashSale[];
}) {
   const [sales, setSales] = useState<FlashSale[]>(initialSales);

   useEffect(() => {
      const unsub = getFlashSaleSnapShot((sales: FlashSale[]) => {
         setSales(sales);
      });

      return () => unsub();
   }, []);

   return sales.map((e: FlashSale, i: number) => (
      <div
         key={e?.id}
         className={`${styles.item} item-fadein`}
         style={{ animationDelay: `${i * .1}s` }}>
         <Product
            wImage={324}
            hImage={324}
            product={e.product}
            sale={e}
         />
      </div>
   ));
}