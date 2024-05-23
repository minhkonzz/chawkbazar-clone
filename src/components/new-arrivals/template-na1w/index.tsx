import styles from "./styles.module.css";
import Product from "@/components/product/template-p1w";

export default function () {
   return (
      <>
         <h3 className={styles.title}>New Arrivals</h3>
         <div className={styles.items}>
            { Array.from({ length: 10 }).fill(0).map((e, index) => <Product />) }
         </div>
      </>
   )
}