import { Button } from "@/components/atoms";
import { Bag } from "@/components/atoms/svgs";
import styles from "../style.module.css";

export default function CheckoutUnavaliable() {
  return (
    <div className={`${styles.wrapper} d-flex fd-col at-center`}>
      <Bag />
      <p className={`${styles.desc} blur fw-600`}>{"You don't have any product in cart. Add some products first"}</p>
      <Button className={styles.btn}>Explore products</Button>
    </div>
  );
}