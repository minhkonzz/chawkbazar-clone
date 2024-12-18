import Banner from "@/components/banner";
import styles from "./page.module.css";
import CheckoutForm from "@/components/checkout/form";
import CheckoutOrder from "@/components/checkout/order";

export default function CheckoutPage() {
   return (
      <Banner title="Checkout">
         <div className={`${styles.wrapper} d-flex mx-auto`}>
            <CheckoutForm />
            <CheckoutOrder />
         </div>
      </Banner>
   );
}
