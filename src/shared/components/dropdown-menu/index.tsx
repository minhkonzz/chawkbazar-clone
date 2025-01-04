"use client"

import { memo, useState, useCallback } from "react";
import { ArrowDown } from "@/components/@svgs";
import styles from "./styles.module.css";

type Option = {
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
   const [open, setOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState<Option>();

   console.log(selectedOption)

   const handleSelectChange = (selectedOption: Option) => {
      setSelectedOption(selectedOption);
      onChange(selectedOption);
      closePopover();
   };
   
   const closePopover = useCallback(() => {
      setOpen(false);
   }, []);

   return (
      <div className={`${className} posrel`}>
         <button
            className={`${styles.btn} w-100pc d-flex at-center jc-center`}
            onClick={() => setOpen(!open)}>
            {selectedOption?.label || title}
            <ArrowDown className={styles.icon} />
         </button>
         {open && (
            <ul
               className={`${styles.list} posab z-1 w-100pc thin-bd-r bg-white`}>
               {data.map(d => (
                  <li 
                     className={`${styles.item} cp`} 
                     onClick={() => handleSelectChange(d)} 
                     key={d.id} 
                     value={d.value}>
                     {d.label}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default memo(DropdownMenu);
