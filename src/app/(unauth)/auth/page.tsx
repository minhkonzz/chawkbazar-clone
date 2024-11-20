import Auth from "@/components/auth";
import styles from "./page.module.css";

export default function AuthPage() {
   return (
      <div className={styles.wrapper}>
         <div className={styles.authWrapper}>
            <Auth />
         </div>
      </div>
   );
}