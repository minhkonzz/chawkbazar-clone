"use client"

import { useState, useEffect } from "react";
import { getBrandsSnapshot } from "@/lib/firebase/firestore/product";
import type { Brand } from "@/shared/types/entities";
import Image from "next/image";
import styles from "./styles.module.css";

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
         style={{ animationDelay: `${i * .1}s` }}
         key={e?.id}
         className={`${styles.brand} posrel o-h item-fadein`}
         href="#">
         <Image
            className={styles.image}
            width={428}
            height={428}
            style={{
               maxWidth: 428,
               maxHeight: 428,
               width: "100%",
               height: "auto"
            }}
            src={e.image}
            alt="brand"
         />
         <span className={`${styles.backface} posab w-100pc h-100pc`}></span>
         <Image
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