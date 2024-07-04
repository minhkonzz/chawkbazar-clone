import { getFirestore } from "firebase/firestore";
import { getOnSellProducts } from "@/lib/firebase/firestore/product";
import getAuthenticatedAppForUser from "@/lib/firebase/server";
import styles from "./styles.module.css";
import Image from "next/image";
import Product from "@/components/product/template-p2d";

export default async function OnSellingProducts() {

   const { firebaseServerApp } = await getAuthenticatedAppForUser();
   const products = await getOnSellProducts(getFirestore(firebaseServerApp));

   if (!products) return <></>;

   return (
      <section className="home-section nfu">
         <div className={`${styles.titleWrapper} d-flex jc-sb at-center`}>
            <h3>On Selling Products</h3>
            <a className={styles.seeAll} href="/search">See All Products</a>
         </div>
         <div className={styles.products}>
            <Image 
               width={428}
               height={600} 
               className={styles.image}
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-sale-offer.jpg&w=640&q=100" 
               alt="selling" 
            />   
            <div className={styles.list}>
               { products.map((product: any, i: number) => <Product key={`${product.id}-${i}`} product={product} />) }
            </div>
         </div>
      </section>
   );
};