import styles from "./styles.module.css";

export default function () {
   return (
      <div className={`${styles.container} d-flex at-center`}>
         <div className={styles.header}>
            <h3 className={styles.heading}>Get Expert Tips In Your Inbox</h3>
            <p className={styles.desc}>Subscribe to our newsletter and stay updated.</p>
         </div>
         <form className={`${styles.form} d-flex jc-end`} action="">
            <input className={styles.input} type="text" spellCheck={false} placeholder="Write your email here" />
            <button className={styles.button}>Subscribe</button>
         </form>
      </div>
   )
}