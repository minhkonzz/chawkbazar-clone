import styles from "./styles.module.css";
import Image from "next/image";

export default function () {
   return (
      <div className={styles.container}>
         <div className={styles.imageContainer}>
            <Image width={322} height={322} src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-26-md.png&w=384&q=100" alt="product-image" /> 
         </div>
         <div className={styles.detail}>
            <h2 className={styles.name}>Adidas Shoes Black</h2>
            <p className={styles.desc}>Self-striped knitted midi A-line dress...</p>
            <div className={styles.prices}>
               <span className={styles.lastPrice}>{`$200`}</span>
            </div>
         </div>
      </div>
   )
}