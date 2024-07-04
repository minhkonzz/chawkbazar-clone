"use client"; 

import { useRef, useEffect } from "react";
import { useModalContext, MODALS } from "@/context/modal";

export default function AppModal() {
   
   const { modal: name, setCurrentModal } = useModalContext()!;
   const Modal = MODALS[name]?.component;

   const backdropRef = useRef<HTMLDivElement | null>(null);
   const modalRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const clearEvents = () => {
         const [modal, backdrop] = [modalRef.current, backdropRef.current];
         if (modal) modal.removeEventListener("animationend", endModalAnimation);
         if (backdrop) backdrop.removeEventListener("animationend", endBackdropAnimation);
      };
      return clearEvents;
   }, []);

   const endModalAnimation = () => {
      const backdrop = backdropRef.current;
      if (!backdrop) return;
      backdrop.addEventListener("animationend", endBackdropAnimation);
      backdrop.style.animation = "opacity-fadeout 1s ease-in-out";
      backdrop.style.animationFillMode = "forwards";
   }

   const endBackdropAnimation = () => {
      setCurrentModal("none");
   }

   const onClose = (e: any, isClickCloseButton: boolean = false) => {
      if (!!setCurrentModal && ((e.target !== e.currentTarget && isClickCloseButton) || e.target === e.currentTarget)) {
         const modal = modalRef.current;
         if (!modal) return;
         modal.addEventListener("animationend", endModalAnimation);
         modal.style.animation = `${name}-invisible .3s ease-in-out`;
         modal.style.animationFillMode = "forwards";
      }
   };

   return Modal && <div ref={backdropRef} className="backdrop" aria-modal="true" role="dialog" onClick={onClose}>
      <Modal {...{ ref: modalRef, onClose }} />
   </div>
}