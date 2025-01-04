"use client";

import { memo, type Dispatch, type SetStateAction } from "@/configs/imports-wrapper";
import styles from "./style.module.css";

export default memo(function PaymentOptions({
  cod,
  setCod
}: {
  cod: boolean;
  setCod: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={`${styles.wrapper} d-flex`}>
      <label
        className={`${styles.option} d-flex at-center cp${cod ? " selected" : ""}`}>
        <input
          onChange={() => setCod(true)}
          name="payment-options"
          type="radio"
          value="cod"
          checked={cod}
          className={styles.radio}
        />
        <span
          className={`${styles.optionText} d-b`}>{`Cash on Delivery (COD)`}</span>
      </label>
      <label
        className={`${styles.option} d-flex at-center cp${!cod ? " selected" : ""}`}>
        <input
          onChange={() => setCod(false)}
          name="payment-options"
          type="radio"
          value="online"
          checked={!cod}
          className={styles.radio}
        />
        <span className={styles.optionText}>Online Payment</span>
      </label>
    </div>
  );
});
