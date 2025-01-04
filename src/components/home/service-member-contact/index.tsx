import { Chat } from "@/components/@svgs";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/shared/components/button";

export default function ServiceMemberContact() {
   return (
      <section className="home-section nfu d-flex fd-col at-center">
         <div className={`${styles.header} mx-auto`}>
            <h3 className={styles.title}>Talk To A Real Person</h3>
            <p className={styles.desc}>
               Are you on the fence? Have a question? Need a recommendation?
               Member Services is always here to help. Send us a message.
            </p>
         </div>
         <Image
            width={870}
            height={300}
            className={styles.image}
            src="/support.webp"
            alt="person-contacts"
         />
         <Button className={`${styles.btn} jc-center at-center`}>
            Chat With Member Services
            <Chat className={styles.ic} />
         </Button>
      </section>
   );
}
