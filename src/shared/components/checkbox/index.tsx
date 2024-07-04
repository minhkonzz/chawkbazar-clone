"use client";

import { ReactNode, useRef, useEffect } from "react";
import styles from "./styles.module.css";
// import { useEffect, useRef } from "react";

interface Props {
   children: ReactNode;
   checked: boolean;
   value: any;
   onSelectChange: (e: React.FormEvent<HTMLInputElement>, value: string) => void;
};

export default function Checkbox({
   children,
   checked,
   value,
   onSelectChange
}: Props) {

   const inputRef = useRef(null);
   const onChange = (checkboxElement: HTMLInputElement, checked: boolean) => {
      checkboxElement.checked = checked;
      if (checked) {
         checkboxElement.setAttribute("checked", "");
         return;
      }
      checkboxElement.removeAttribute("checked");
   }

   useEffect(() => {
      const element = inputRef.current;
      if (element) onChange(element, checked);
   }, [checked]);

   return (
      <label className={styles.wrapper}>
         { children }
         <input 
            className={styles.input}
            ref={inputRef}
            type="checkbox"
            value={value?.optionId} 
            onChange={(e) => onSelectChange(e, value)} 
         /> 
         <span className={styles.checkmark}></span>
      </label>
   )
}