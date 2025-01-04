"use client";

import { useState, useEffect } from "@/configs/imports-wrapper";
import type { Product as SerializedProduct } from "@/types/entities";
import { getOnSellProductsSnapShot } from "@/lib/firebase/firestore/product";
import Product from "@/components/molecules/product/template-p2d";
import styles from "./style.module.css";

export default function OnSellingProductsList({
  initialProducts
}: {
  initialProducts: SerializedProduct[];
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
      style={{ animationDelay: `${i * 0.1}s` }}>
      <Product imageStyle={styles.itemImage} product={product} />
    </div>
  ));
}
