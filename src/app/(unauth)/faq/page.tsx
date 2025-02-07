"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";
import Banner from "@/components/banner";

const _mockFAQ = [
   {
      id: "faq1",
      q: "How to contact with Customer Service?",
      a: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!."
   },
   {
      id: "faq2",
      q: "App installation failed, how to update system information?",
      a: "Please read the documentation carefully . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum"
   },
   {
      id: "faq3",
      q: "Website response taking time, how to improve?",
      a: "At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum."
   },
   {
      id: "faq4",
      q: "How do I create an account?",
      a: "If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes."
   }
];

const visibleClassNames: string[] = ["max-h-999", "blur-0", "h-auto"];
const invisibleClassNames: string[] = ["ex-blur", "max-h-0", "d-none"];

export default function Faq() {
   const [boxIndex, setBoxIndex] = useState<number>(-1);
   const refs = useRef<HTMLDivElement[]>([]);

   const onClick = (i: number) => {
      return () => {
         const target = refs.current[i];
         const answer = target.querySelector("p");

         const hided = answer?.classList.contains("max-h-0");

         if (hided) {
            answer?.classList.add(...visibleClassNames);
            answer?.classList.remove(...[...invisibleClassNames, "d-none"]);
         } else {
            answer?.classList.add(...invisibleClassNames);
            answer?.classList.remove(...visibleClassNames);
         }

         if (i !== boxIndex && boxIndex !== -1) {
            const prevBox = refs.current[boxIndex];
            const prevAnswer = prevBox.querySelector("p");

            prevAnswer?.classList.remove(...visibleClassNames);
            prevAnswer?.classList.add(...invisibleClassNames);
         }

         setBoxIndex(i);
      };
   };

   return (
      <Banner title="Frequently Asked Questions">
         <div className="wrapper1920">
            <div className={`${styles.wrapper} mx-auto`}>
               {_mockFAQ.map((e, i) => (
                  <div
                     key={e.id}
                     ref={_e => {
                        refs.current[i] = _e!;
                     }}
                     className={styles.box}
                     onClick={onClick(i)}>
                     <header
                        className={`${styles.header} d-flex jc-sb at-center cp`}>
                        <h2 className={styles.questionText}>{e.q}</h2>
                        <button
                           className={`${styles.openIc} posrel flex-center`}>
                           <div className={`${styles.hz} w-100pc`}></div>
                           <div className={`${styles.vt} posab h-100pc`}></div>
                        </button>
                     </header>
                     <p className={`${styles.answer} d-none max-h-0 ex-blur`}>
                        {e.a}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </Banner>
   );
}
