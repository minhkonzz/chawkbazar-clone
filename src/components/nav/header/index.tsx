import Ls from "./ls";
import Rs from "./rs";
import styles from "./styles.module.css";

export default function NavHeader() {
   return (
      <header className={styles.container}>
         <div className={`${styles.inner} d-flex jc-sb h-100pc mx-auto`}>
            <Ls />
            <Rs />
         </div>
      </header>
   );
};