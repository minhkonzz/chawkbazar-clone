"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Checkbox from "@/shared/components/checkbox";
import styles from "./styles.module.css";

export default function FilterSection({
   paramName,
   title,
   options
}: any) {

   const pathname = usePathname();
   const searchParams = useSearchParams();

   const updateFilter = (e: any, option: any) => {
      const params = new URLSearchParams(searchParams.toString());
      const value = params.get(paramName);
      if (e.target.checked) {
         params.set(
            paramName, 
            value ? value.concat(`,${option.slug}`) : option.slug
         );
      }
      else {
         const all = value!.split(",");
         const index = all.indexOf(option.slug);
         all.splice(index, 1);
         params.set(paramName, all.join(","));
      }
      window.history.replaceState(null, "", pathname + "?" + params.toString());
   }   

   return (
      <div className={styles.wrapper}>
         <h3 className={styles.title}>{title}</h3>
         <div className={`${styles.list} d-flex fd-col`}>
            { options.map((option: any, i: number) =>
               <Checkbox
                  checked={searchParams.get(paramName)!?.includes(option.slug) || false}
                  onSelectChange={updateFilter}
                  key={`${option.id}-${i}`}
                  value={option}>
                  {option.name}
               </Checkbox>
            ) }
         </div>
      </div>
   );
};