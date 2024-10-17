import { fixDecimal } from "@/shared/helpers/number";
import { SelectedProduct } from "@/shared/types/entities";
import { useCartContext } from "@/context/cart";
import { env } from "@/configs";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CheckoutOrderDetail() {

   const { cart } = useCartContext()!;
   const { items, totalPrice } = cart;
   const shipFee: number = 2.99;

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Your order</h2>
         <div className={`${styles.header} d-flex jc-sb`}>
            <span>Product</span>
            <span>Subtotals</span>
         </div>
         {items.map((item: SelectedProduct, index: number) => 
            <div className={`${styles.product} d-flex at-center jc-sb`} key={index}>
               <div className="d-flex at-center">
                  <Image 
                     width={62}
                     height={62}
                     src={`${env.PRODUCT_IMAGE_STORAGE}${item.image.p}`} 
                     alt="order-product"    
                  />
                  <h6 className={styles.productText}>{`${item?.name} - ${item?.selectedSize.value}, ${item?.selectedColor.value}`}</h6>
               </div>
               <span className={styles.productText}>${`${fixDecimal(item?.sale_price || item?.price, 2)}`}</span>
            </div>
         )}
         <div className={`${styles.wrapper} d-flex at-center jc-sb`}>
            <span>Shipping</span>
            <span>Free</span>
         </div>
         <div className={`${styles.wrapper} d-flex at-center jc-sb`}>
            <span>Total</span>
            <span>${`${fixDecimal(totalPrice + shipFee, 2)}`}</span>
         </div>
      </div>
   );
};