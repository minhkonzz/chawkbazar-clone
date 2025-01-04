import { useState } from "@/configs/imports-wrapper";
import type { Product as SerializedProduct } from "@/types/entities";
import { useProductOptions } from "@/hooks";
import { Button } from "@/components/atoms";
import { fixDecimal } from "@/helpers/number";
import { Checked, Warn } from "@/components/atoms/svgs";
import Variations from "./variations";
import Quantity from "./quantity";
import styles from "./style.module.css";

export default function ProductDetailMain({ item }: { item: SerializedProduct }) {
  const {
    product,
    amount,
    color,
    size,
    stock,
    error,
    clickChangeAmount,
    onModifyingAmount,
    changeSize,
    changeColor,
    handleAddToCart
  } = useProductOptions(item);

  const [addedCart, setAddedCart] = useState<boolean>(false);

  const addProductToCart = () => {
    const addedCart = handleAddToCart();
    setAddedCart(addedCart);
  };

  return (
    <div className={`${styles.about} d-flex w-100pc`}>
      {error && <div className={`${styles.message} ${styles.err} d-flex at-center`}>
        <Warn className={`${styles.messageIc} ${styles.err}`} />
        {error}
      </div>}
      {addedCart && <div className={`${styles.message} d-flex at-center`}>
        <Checked className={styles.messageIc} />
        {`Added ${amount} * ${item.name} - ${size}, ${color.name} to cart`}
      </div>}
      <h2 className={styles.name}>{product?.name}</h2>
      <p className={styles.desc}>{product?.description}</p>
      <div className={`${styles.prices} d-flex`}>
        {product.sale?.lastPrice && (
          <h2>{`$${fixDecimal(product.sale.lastPrice, 2)}`}</h2>
        )}
        <h2
          {...(product.sale?.lastPrice
            ? { className: styles.line }
            : {})}>{`$${fixDecimal(product?.price, 2)}`}</h2>
      </div>
      <p className={styles.desc}>In stock: {stock}</p>
      <Variations 
        changeColor={changeColor} 
        changeSize={changeSize} 
        variations={product.variations} 
      />
      <div style={{ marginTop: 40 }} className="d-flex at-center">
        <Quantity 
          amount={amount}
          onModifyingAmount={onModifyingAmount}
          clickChangeAmount={clickChangeAmount}
        />
        <Button
          onClick={addProductToCart}
          className={`${styles.btn} dark-v d-flex jc-center at-center thin-bd-r`}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
