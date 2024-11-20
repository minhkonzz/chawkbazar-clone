"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import TextInput from "@/shared/components/text-input";
import Button from "@/shared/components/button";

export default function EmailSubscribe() {
   const [input, setInput] = useState<string>("");

   return (
      <section
         className={`${styles.wrapper} home-section nfu d-flex at-center`}>
         <div className={styles.header}>
            <h3 className={styles.heading}>Get Expert Tips In Your Inbox</h3>
            <p className={styles.desc}>
               Subscribe to our newsletter and stay updated.
            </p>
         </div>
         <form className={styles.form} action="">
            <TextInput
               customStyle={styles.inp}
               placeholder="Write your email here"
               inputValue={input}
               onChange={e => setInput(e.target.value)}
            />
            <Button className={styles.btn}>Subscribe</Button>
         </form>
      </section>
   );
}
