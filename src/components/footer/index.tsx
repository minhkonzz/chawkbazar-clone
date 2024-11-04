import styles from "./styles.module.css";
import { mock } from "./mock";

export default function Footer() {
   return (
      <footer className={`${styles.wrapper} mx-auto`}>
         <div className={styles.sections}>
            {mock.map((e, i) => (
               <div className={styles.section} key={i}>
                  <h4 className={styles.title}>{e.title}</h4>
                  <ul className={styles.list}>
                     {e.references.map((ref, _i) => (
                        <li key={ref.id}>
                           <a className={styles.link} href="#">
                              {ref.title}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </footer>
   );
}
