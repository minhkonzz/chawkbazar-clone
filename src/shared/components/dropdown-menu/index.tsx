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
}

function DropdownMenu({ title, data, onChange }: Props) {
   const [open, setOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState<Option>();

   const handleSelectChange = (selectedOption: Option) => {
      setSelectedOption(selectedOption);
      onChange(selectedOption);
      setOpen(false);
   };

   return (
      <div className={`${styles.wrapper} posrel d-ib`}>
         <button
            className={`${styles.btn} d-flex at-center jc-center fw-600`}
            onClick={() => setOpen(!open)}>
            {selectedOption?.label || title}
            <ArrowDown className={styles.icon} />
         </button>
         {open && (
            <ul
               className={`${styles.list} posab z-1 w-100pc thin-bd-r bg-white`}>
               {data.map(d => (
                  <li onClick={() => handleSelectChange(d)} key={d.id} value={d.value}>{d.label}</li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default memo(DropdownMenu);
