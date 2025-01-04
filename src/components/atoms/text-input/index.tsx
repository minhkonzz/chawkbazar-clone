import type { ReactChangeEvent } from "@/configs/imports-wrapper";
import styles from "./style.module.css";

interface Props {
  isPassword?: boolean;
  textArea?: {
    r: number;
    c: number;
  };
  customStyle?: any;
  label?: string;
  placeholder: string;
  inputValue?: string;
  onChange?: (e: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMessage?: string;
}

export default function TextInput({
  isPassword,
  textArea,
  customStyle,
  label,
  placeholder,
  inputValue,
  onChange,
  errorMessage
}: Props) {
  const props = {
    className: `w-100pc bg-white text-black ${styles.inp} ${customStyle}`,
    value: inputValue || "",
    placeholder: placeholder ?? "",
    spellCheck: false,
    ...(onChange ? { onChange } : {})
  };

  return (
    <div>
      {label && <label className={`${styles.label} d-b fw-600`}>{label}</label>}
      {textArea && <textarea {...{ ...props, rows: textArea.r, cols: textArea.c }} /> || 
      <input {...props} type={isPassword && "password" || "text"} />}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}
