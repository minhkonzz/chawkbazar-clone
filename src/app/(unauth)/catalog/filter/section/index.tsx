import { type ReactChangeEvent, useSearchParams, usePathname } from "@/configs/imports-wrapper";
import { Checkbox, SkeletonLoader } from "@/components/atoms";
import type { ProductAttributeOption } from "@/types";
import styles from "./style.module.css";

interface Props {
  paramName: string;
  title: string;
  options: ProductAttributeOption[];
}

export function Skeleton() {
  return (
    <div className={styles.wrapper}>
      <SkeletonLoader className={styles.titleSkeleton} />
      <div className={`${styles.list} d-flex fd-col`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoader key={i} className={styles.itemSkeleton} />
        ))}
      </div>
    </div>
  );
}

export default function FilterSection({ paramName, title, options }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (
    e: ReactChangeEvent<HTMLInputElement>,
    option: ProductAttributeOption
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = params.get(paramName);
    if (e.target.checked) {
      params.set(
        paramName,
        value ? value.concat(`,${option.slug}`) : option.slug
      );
    } else {
      const all = value!.split(",");
      const index = all.indexOf(option.slug);
      all.splice(index, 1);
      params.set(paramName, all.join(","));
    }
    window.history.replaceState(null, "", pathname + "?" + params.toString());
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={`${styles.title} fw-600`}>{title}</h3>
      <div className={`${styles.list} d-flex fd-col`}>
        {options.map((option: ProductAttributeOption, i: number) => (
          <Checkbox
            checked={
              searchParams.get(paramName)!?.includes(option.slug) || false
            }
            onSelectChange={updateFilter}
            key={`${option.id}-${i}`}
            value={option}>
            {option.name}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
