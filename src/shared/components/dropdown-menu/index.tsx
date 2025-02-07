"use client";

import { memo, useState, useEffect, useCallback, useRef } from "react";
import { ArrowDown } from "@/components/@svgs";
import styles from "./styles.module.css";

export type Option = {
   id: string;
   label: string;
   value: string;
};

interface Props {
   title: string;
   data: Option[];
   onChange: (selectedOption: Option) => void;
   className?: string;
}

function DropdownMenu({ title, data, onChange, className }: Props) {
   const wrapper = useRef<HTMLButtonElement | null>(null);
   const [open, setOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState<Option>();

   useEffect(() => {
      const closePopover = (e: MouseEvent) => {
         if (e.target == wrapper.current) return;
         setOpen(false);
      }

      window.addEventListener("click", closePopover)
      return () => window.removeEventListener("click", closePopover);
   }, []);

   const handleSelectChange = (selectedOption: Option) => () => {
      setSelectedOption(selectedOption);
      onChange(selectedOption);
      setOpen(false);
   };

   const changeOpen = useCallback(() => {
      setOpen(!open);
   }, [open]);

   return (
      <button
         ref={wrapper}
         className={`${styles.btn} posrel w-100pc d-flex at-center jc-sb${className ? " " + className : ""}`}
         onClick={changeOpen}>
         {selectedOption?.label || title}
         <ArrowDown className={styles.icon} />
         {open && (
            <ul
               onBlur={changeOpen}
               className={`${styles.list} posab z-1 w-100pc thin-bd-r bg-white`}>
               {data.map(d => (
                  <li
                     className={`${styles.item} cp`}
                     onClick={handleSelectChange(d)}
                     key={d.id}
                     value={d.value}>
                     {d.label}
                  </li>
               ))}
            </ul>
         )}
      </button>
   );
}

export default memo(DropdownMenu);
