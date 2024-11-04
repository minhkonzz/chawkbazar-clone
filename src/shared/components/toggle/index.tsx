import { useState } from "react";
import styles from "./styles.module.css";

export default function Toggle() {
   const [toggled, setToggled] = useState<boolean>(false);

   return (
      <button
         onClick={() => setToggled(!toggled)}
         className={`${styles.wrapper} ${(toggled && styles.toggled) || styles.notToggled} posrel d-ib cp`}>
         <span className={styles.nude}></span>
      </button>
   );
}
