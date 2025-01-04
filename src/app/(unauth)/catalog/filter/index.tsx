import styles from "./style.module.css";
import FilterMain from "./body";

export default function Filter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.path}>Home / Search</p>
        <FilterMain />
      </div>
    </div>
  );
}
