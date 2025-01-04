import { memo } from "@/configs/imports-wrapper";
import { constants } from "@/configs";
import styles from "./style.module.css";

interface Props {
  amount: number;
  onModifyingAmount: (newAmount: number) => void;
  clickChangeAmount: (act: "INCREASE" | "DECREASE") => void;
};

function Quantity({
  amount,
  onModifyingAmount,
  clickChangeAmount
}: Props) {
  return (
    <div className={`${styles.qty} d-flex thin-bd-r`}>
      <button
        className={`${styles.qtyBtn} increase h-100pc fw-600`}
        onClick={() => clickChangeAmount("DECREASE")}>
        <svg width="10px" height="2px" viewBox="0 0 12 1.5">
          <rect
            data-name="Rectangle 970"
            width="10px"
            height="2px"
            fill="currentColor"></rect>
        </svg>
      </button>
      <input
        type="number"
        min={constants.DEFAULT_QUANTITY}
        max={constants.MAX_QUANTITY}
        className={`${styles.qtyValue} fw-600`}
        value={amount}
        onChange={e => onModifyingAmount(+e.target.value)}
      />
      <button
        className={`${styles.qtyBtn} decrease h-100pc fw-600`}
        onClick={() => clickChangeAmount("INCREASE")}>
        <svg
          data-name="plus (2)"
          width="10px"
          height="10px"
          viewBox="0 0 12 12">
          <g data-name="Group 5367">
            <path
              data-name="Path 17138"
              d="M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
    </div>
  )
}

export default memo(Quantity);