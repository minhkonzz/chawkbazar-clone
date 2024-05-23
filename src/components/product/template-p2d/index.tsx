import styles from "./styles.module.css";
import Image from "next/image";

export default function () {
   return (
      <div className={`${styles.container} d-flex at-center cp`}>
         <div>
            <Image 
               width={176} 
               height={176} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-11-xs.png&w=256&q=100" 
               alt="product" 
               priority 
            />
         </div>
         <div className={styles.detail}>
            <h2 className={styles.name}>Armani Veni Vidi Vici</h2>
            <p className={styles.desc}>Fendi began life in 1925 as a fur and leather speciality store in Rome.</p>
            <div className={`${styles.prices} d-flex at-center wrap`}>
               <span>$17.00</span>
               <del className={styles.firstPrice}>$20.00</del>
            </div>
         </div>
      </div>
   )
}