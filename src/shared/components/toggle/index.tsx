import { useState } from "react";
import styles from "./styles.module.css";

export default function Toggle() {
   const [toggled, setToggled] = useState<boolean>(false);

   return (
      <button
         onClick={() => setToggled(!toggled)}
         className={`${styles.wrapper} ${(toggled && styles.toggled) || styles.notToggled} posrel d-ib`}>
         <span className={`${styles.nude} bg-white`}></span>
      </button>
   );
}
