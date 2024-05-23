import styles from "./styles.module.css";
import Product from "@/components/product/template-p1w";

export default function () {
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <h3 className={styles.title}>Flash Sale</h3>
            <span>Time over!</span>
         </div>
         <div className={styles.items}>
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
         </div>
      </div>
   )
}