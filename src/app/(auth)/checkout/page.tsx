import Banner from "@/components/banner";
import styles from "./page.module.css";
import Checkout from "@/components/checkout";

export default function CheckoutPage() {
   return (
      <Banner title="Checkout">
         <div className={`${styles.wrapper} d-flex mx-auto`}>
            <Checkout />
         </div>
      </Banner>
   );
}
