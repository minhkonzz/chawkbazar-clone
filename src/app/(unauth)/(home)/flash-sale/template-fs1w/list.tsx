"use client";

import { useState, useEffect } from "@/configs/imports-wrapper";
import { getFlashSaleSnapShot } from "@/lib/firebase/firestore/product";
import type { FlashSale } from "@/types/entities";
import Product from "@/components/molecules/product/template-p1w";
import styles from "./style.module.css";

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
      style={{ animationDelay: `${i * 0.1}s` }}>
      <Product imageStyle={styles.itemImage} product={e.product} sale={e} />
    </div>
  ));
}
