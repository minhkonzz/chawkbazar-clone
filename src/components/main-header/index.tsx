import Ls from "./ls/Ls";
import Rs from "./rs/Rs";
import styles from "./styles.module.css";

export default function () {
   return (
      <header className={styles.header}>
         <div className={`${styles.headerInner} d-flex jc-sb h-100pc mx-auto`}>
            <Ls />
            <Rs />
         </div>
      </header>
   )
}