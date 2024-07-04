"use client";

import styles from "./styles.module.css";
import TextInput from "@/shared/components/text-input";

export default function EmailSubscribe() {
   return (
      <section className={`${styles.container} home-section nfu d-flex at-center`}>
         <div className={styles.header}>
            <h3 className={styles.heading}>Get Expert Tips In Your Inbox</h3>
            <p className={styles.desc}>Subscribe to our newsletter and stay updated.</p>
         </div>
         <form className={`${styles.form} d-flex jc-end`} action="">
            <div className={styles.input}>
               <TextInput 
                  customStyle={styles.inp}
                  placeholder="Write your email here"
                  inputValue="Hello"
                  onChange={() => {}}
                  errorMessage=""
               />
            </div>
            <button className={styles.button}>Subscribe</button>
         </form>
      </section>
   )
}