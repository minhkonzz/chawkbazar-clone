"use client";

import { NextImage, useState, useEffect } from "@/configs/imports-wrapper";
import { getBrandsSnapshot } from "@/lib/firebase/firestore/product";
import type { Brand } from "@/types/entities";
import styles from "./style.module.css";

export default function TopBrandsList({
  initialBrands
}: {
  initialBrands: Brand[];
}) {
  const [_brands, setBrands] = useState<Brand[]>(initialBrands);

  useEffect(() => {
    const unsub = getBrandsSnapshot((brands: Brand[]) => {
      setBrands(brands);
    });

    return () => unsub();
  }, []);

  return _brands.map((e: Brand, i: number) => (
    <a
      style={{ animationDelay: `${i * 0.1}s` }}
      key={e?.id}
      className={`${styles.brand} posrel o-h item-fadein`}
      href="#">
      <NextImage
        className={styles.image}
        fill
        src={e.image}
        alt={e.name}
      />
      <span className={`${styles.backface} posab w-100pc h-100pc`} />
      <NextImage
        className="posab pos-center"
        width={200}
        height={94}
        style={{ height: "auto", width: "auto" }}
        src={e.logo}
        alt="brand-logo"
      />
    </a>
  ));
}
