"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFilteredProducts } from "@/lib/firebase/firestore/product";
import { transformFilterOptions } from "@/shared/helpers/global";
import { isEmptyArray } from "@/shared/helpers/array";
import SortingOptions from "./sorting-options";
import Product from "../../product/template-p1w";
import styles from "./styles.module.css";

const PER_COUNT: number = 25;

export default function CatalogProducts() {

   const [products, setProducts] = useState([]);
   const searchParams = useSearchParams();

   useEffect(() => {
      (async() => {
         const filter = transformFilterOptions(searchParams);
         const _products = await getFilteredProducts(filter);
         setProducts(_products);
      })(); 
   }, [searchParams]);

   return (
      !isEmptyArray(products) && 
      <div className="w-100pc">
         <div className={`${styles.itemsHeader} d-flex jc-sb at-center`}>
            <h1 className={styles.itemsTitle}>Casual wear</h1>
            <div className="d-flex at-center jc-end">
               <span className={styles.itemsCount}>{products.length} items</span>
               <SortingOptions />
            </div>
         </div>
         <div className={styles.list}>
            { products.map((product: any, i: number) => {
               const { id, image } = product;
               if (!image.p) return <></>;
               return <Product key={`${id}-${i}`} {...{
                  id,
                  wImage: 334, 
                  hImage: 432, 
                  product,
                  imagePath: image.p, 
               }} />;
            }) }
         </div>
         <div className={`${styles.loadMoreWrapper} text-center`}>
            <button className={`${styles.loadMoreButton} cp`}>Load more</button>
         </div>
      </div>
   )
}