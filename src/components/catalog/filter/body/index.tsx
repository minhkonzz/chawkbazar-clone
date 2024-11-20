"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getProductAttributes } from "@/lib/firebase/firestore/product";
import type { ProductAttributes, ProductAttributeOption } from "@/shared/types";
import { Skeleton as SectionSkeleton } from "../section";
import SkeletonLoader from "@/shared/components/skeleton";
import Section from "../section";
import styles from "./styles.module.css";

function Skeleton() {
   return (
      <>
         <div className={styles.wrapper}>
            <SkeletonLoader
               width={100}
               height={40}
               className={styles.headerSkeleton}
            />
         </div>
         <SectionSkeleton />
         <SectionSkeleton />
      </>
   );
}

export default function FilterMain() {
   const [attributes, setAttributes] = useState<ProductAttributes>();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   useEffect(() => {
      (async () => {
         const _attributes = await getProductAttributes();
         setAttributes(_attributes);
      })();
   }, []);

   const selectedOptions = useMemo(() => {
      let r: string[] = [];
      const params = Array.from(searchParams.entries());
      for (let i = 0; i < params.length; ++i) {
         const [key, value] = params[i];
         const values = value.split(",");
         r = [
            ...r,
            ...(attributes?.[key as keyof ProductAttributes]?.options ?? [])
               .filter((e: ProductAttributeOption) => values.includes(e.slug))
               .map((e: ProductAttributeOption) => e.name)
         ];
      }
      return r;
   }, [searchParams]);

   const clearFilter = useCallback(() => {
      window.history.replaceState(null, "", pathname);
   }, []);

   return (
      (attributes && (
         <>
            <div className={styles.wrapper}>
               <div className={`${styles.header} d-flex at-center jc-sb`}>
                  <h2 className={styles.heading}>Filter</h2>
                  <button
                     className={`${styles.clear} cp`}
                     onClick={clearFilter}>
                     Clear all
                  </button>
               </div>
               <div className="d-flex wrap">
                  {selectedOptions.map((e, i: number) => (
                     <div
                        className={`${styles.selected} d-flex at-center cp`}
                        key={i}>
                        {e}
                        <svg
                           stroke="currentColor"
                           fill="currentColor"
                           strokeWidth="0"
                           viewBox="0 0 512 512"
                           className={styles.xIc}
                           height="1em"
                           width="1em">
                           <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                        </svg>
                     </div>
                  ))}
               </div>
            </div>
            {Object.keys(attributes).map((e: string, i: number) => {
               const attr = attributes[e as keyof ProductAttributes];
               return (
                  <Section
                     key={i}
                     paramName={e}
                     title={attr.title}
                     options={attr.options}
                  />
               );
            })}
         </>
      )) || <Skeleton />
   );
}
