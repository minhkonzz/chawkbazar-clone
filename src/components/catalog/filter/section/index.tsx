import { ChangeEvent } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { ProductAttributeOption } from "@/shared/types";
import SkeletonLoader from "@/shared/components/skeleton";
import Checkbox from "@/shared/components/checkbox";
import styles from "./styles.module.css";

interface Props {
   paramName: string;
   title: string;
   options: ProductAttributeOption[];
};

export function Skeleton() {
   return (
      <div className={styles.wrapper}>
         <SkeletonLoader className={styles.titleSkeleton} width={80} height={20} />
         <div className={`${styles.list} d-flex fd-col`}>
            {Array.from({ length: 10 }).map((_, i) => <SkeletonLoader key={i} height={28} />)}
         </div>
      </div>
   );
};

export default function FilterSection({
   paramName,
   title,
   options
}: Props) {

   const pathname = usePathname();
   const searchParams = useSearchParams();

   const updateFilter = (e: ChangeEvent<HTMLInputElement>, option: ProductAttributeOption) => {
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
   };  

   return (
      <div className={styles.wrapper}>
         <h3 className={styles.title}>{title}</h3>
         <div className={`${styles.list} d-flex fd-col`}>
            {options.map((option: ProductAttributeOption, i: number) =>
               <Checkbox
                  checked={searchParams.get(paramName)!?.includes(option.slug) || false}
                  onSelectChange={updateFilter}
                  key={`${option.id}-${i}`}
                  value={option}>
                  {option.name}
               </Checkbox>
            )}
         </div>
      </div>
   );
};