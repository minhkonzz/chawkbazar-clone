import styles from "./styles.module.css";
import Image from "next/image";
import Product from "@/components/product/template-p2d";

export default function () {
   return (
      <div className={styles.container}>
         <div className={`${styles.titleWrapper} d-flex jc-sb at-center`}>
            <h3 className={styles.title}>On Selling Products</h3>
            <a className={styles.seeAll} href="/search">See All Products</a>
         </div>
         <div className={styles.products}>
            <div>
               <a href="#">
                  <Image 
                     width={428}
                     height={600} 
                     src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-sale-offer.jpg&w=640&q=100" 
                     alt="selling" 
                  />
                  <div></div>
               </a>               
            </div>
            <div className={styles.list}>
               { Array.from({ length: 9 }).fill(0).map((e, index) => <Product />) }
            </div>
         </div>
      </div>
   )
}