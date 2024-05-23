import styles from "./styles.module.css";
import Image from "next/image";

function Brand() {
   return (
      <a className={`${styles.brandWrapper} posrel o-h`} href="#">
         <Image 
            className={styles.image}
            width={428} 
            height={428} 
            src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fgrid%2Ffusion-bg.jpg&w=1080&q=75" 
            alt="brand" 
         />
         <span className={`${styles.backface} posab w-100pc h-100pc`}></span>
         <Image 
            className="posab pos-center"
            width={200}
            height={94} 
            src="https://chawkbazar.vercel.app/assets/images/brands/grid/fusion.png"
            alt="brand-logo" 
         />
      </a>
   )
}

export default function () {
   return (
      <div className={styles.container}>
         <h3 className={styles.title}>Top brands</h3>
         <div className={styles.brands}> 
            { Array.from({ length: 8 }).fill(0).map((e, index) => <Brand />) }
         </div>
      </div>
   )
}