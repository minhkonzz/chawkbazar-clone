import type { RadioGroupOption } from "@/types";
import styles from "./style.module.css";

export default function RadioGroup({
  options
}: {
  options: RadioGroupOption[];
}) {
  return (
    <>
      {options.map((e: RadioGroupOption, i: number) => (
        <label key={`rg${i}`} className="d-flex at-center">
          <input type="radio" className={styles.inp} value={e.value} />
          <span className={styles.title}>{e.title}</span>
        </label>
      ))}
    </>
  );
}
