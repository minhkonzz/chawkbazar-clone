"use client"

import { useIntersectionObserver } from "@/shared/hooks";
import { getNewArrivalProducts } from "@/lib/firebase/firestore/product";
import styles from "./styles.module.css";
import Product from "@/components/product/template-p1w";

export default function NewArrivals() {

   const [ref, products] = useIntersectionObserver<any>(async () => {
      return await getNewArrivalProducts();
   });
;
   return (
      <section {...{ref}} className="home-section nfu observe">
         <h3 className={styles.title}>New Arrivals</h3>
         <div className={styles.items}>
            { products && products.map((item: any, index: number) => {
               const { id, image } = item;
               return <Product 
                  key={`${index}-${id}`} 
                  wImage={352} 
                  hImage={452} 
                  product={item}
                  imagePath={image}
               />
            }) || <></> }
         </div>
      </section>
   );
};