"use client"; 

import { useRef } from "react";
import { useModalContext, MODALS } from "@/context/modal";
import styles from "./styles.module.css";

export default function AppModal() {
   
   const { modal, setCurrentModal } = useModalContext()!;
   const Popup = MODALS[modal]?.component;

   const backdropRef = useRef<HTMLDivElement | null>(null);
   const modalRef = useRef<HTMLDivElement | null>(null);

   const onClose = (e: any, isClickCloseButton: boolean = false) => {
      if (!!setCurrentModal && ((e.target !== e.currentTarget && isClickCloseButton) || e.target === e.currentTarget)) {
         const modal = modalRef.current;
         const backdrop = backdropRef.current;
         if (!backdrop || !modal) return;  

         modal.addEventListener("animationend", function () { 
            console.log("modal animation ended"); 
         });

         modal.classList.add(styles[`${modal}-invisible`]);
         setCurrentModal("none");
      }
   };

   return Popup && (
      <div ref={backdropRef} className="backdrop" aria-modal="true" role="dialog" onClick={onClose}>
         <Popup {...{ ref: modalRef, onClose }} />
      </div>
   );
}