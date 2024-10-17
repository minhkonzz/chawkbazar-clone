"use client"

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context";
import styles from "./styles.module.css";

export default function AsideNav() {

   const router = useRouter();
   const submenuRef = useRef<HTMLUListElement>(null);
   const { setCurrentModal } = useModalContext()!;

   const touchSubmenu = () => {
      if (!submenuRef.current) return;
      submenuRef.current.classList.toggle("open");
   }

   const close = () => {
      setCurrentModal("none");
   }

   const navigate = (routeName: string) => {
      router.push(routeName);
      close();
   }

   return (
      <nav className={`${styles.container} posab top-0 left-0 bottom-0 bg-white`}>
         <div className={styles.top}>
            {/* logo shop */}
            <button onClick={close}>x</button>
         </div>
         <div className={styles.center}>
            <ul className={styles.menu}>
               <li onClick={() => navigate("/search")}>Products</li>
               <li>
                  <span className="flex-row-sb" onClick={touchSubmenu}>Pages</span>
                  <ul className={styles.submenu} ref={submenuRef}>
                     {[
                        { routeName: "/account/profile", routeText: "My Account" },
                        { routeName: "/faq", routeText: "FAQ" },
                        { routeName: "/policy", routeText: "Terms & Conditions" }, 
                        { routeName: "/contact", routeText: "Contact" },
                        { routeName: "/checkout", routeText: "Checkout" }
                     ].map((route: { routeName: string, routeText: string }, i: number) => 
                        <li key={`${route.routeName}-${i}`} onClick={() => navigate(route.routeName)}>
                           {route.routeText}
                        </li>
                     )}  
                  </ul>
               </li>
            </ul>
         </div>
         <div className={`${styles.bottom} flex-center`}>
            <a href="https://www.google.com/">logo-facebook</a>
            <a href="https://www.google.com/">logo-twitter</a>
            <a href="https://www.google.com/">logo-youtube</a>
            <a href="https://www.google.com/">logo-instagram</a>
         </div>
      </nav>
   );
};