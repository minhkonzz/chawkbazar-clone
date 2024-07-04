import { getFirestore } from "firebase/firestore";
import { getFlashSaleProducts } from "@/lib/firebase/firestore/product";
import getAuthenticatedAppForUser from "@/lib/firebase/server";
import styles from "./styles.module.css";
import Product from "@/components/product/template-p1w";

export default async function FlashSale() {

   const { firebaseServerApp } = await getAuthenticatedAppForUser();
   const products = await getFlashSaleProducts(getFirestore(firebaseServerApp));

   if (!products) return <></>;

   return (
      <section className={`${styles.container} home-section nfu`}>
         <div className={styles.header}>
            <h3>Flash Sale</h3>
            <span>Time over!</span>
         </div>
         <div className={styles.items}>
            { products.map((e: any) => 
               <Product 
                  key={`${e.id}`}
                  wImage={324}
                  hImage={324}
                  imagePath={e.image.pmd}
                  product={e}
               />
            )}
         </div>
      </section>
   )
};