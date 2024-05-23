import Image from "next/image";
import styles from "./styles.module.css";
import { mergeStyles } from "@/utils/helpers";

export default function () {
   return (
      <div className={`${styles.container} mx-auto`}>
         <div className={mergeStyles(styles, ["collection", "prime"])}>
            <Image 
               className={styles.image} 
               width={1030} 
               height={425} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-1.jpg&w=3840&q=100" 
               alt="logo_shop" 
               priority />
         </div>
         <div className={styles.collection}>
            <Image 
               className={styles.image} 
               width={425} 
               height={425} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=640&q=100" 
               alt="logo_shop" />
         </div>
         <div className={styles.collection}>
            <Image 
               className={styles.image} 
               width={425} 
               height={425} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=640&q=100" 
               alt="logo_shop" />
         </div>
         <div className={styles.collection}>
            <Image 
               className={styles.image} 
               width={425} 
               height={425} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" 
               alt="logo_shop" />
         </div>
         <div className={styles.collection}>
            <Image 
               className={styles.image} 
               width={425} 
               height={425} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=640&q=100" 
               alt="logo_shop" />
         </div>
         <div className={`${styles.collection} ${styles.prime}`}>
            <Image 
               className={styles.image} 
               width={1030} 
               height={425} 
               src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-6.jpg&w=1080&q=100" 
               alt="logo_shop" />
         </div>
      </div>
   )
}