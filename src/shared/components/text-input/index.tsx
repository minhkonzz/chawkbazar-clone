import { ChangeEvent } from "react";
import styles from "./styles.module.css";

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
   onChange?: (e: any) => void;
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
      className: `w-100pc ${styles.inp} ${customStyle}`,
      value: inputValue || "",
      placeholder: placeholder ?? "",
      spellCheck: false,
      ...(onChange
         ? {
              onChange: (
                 e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => onChange(e)
           }
         : {})
   };

   return (
      <>
         {label && <label className={`${styles.label} d-b`}>{label}</label>}
         {(textArea && (
            <textarea {...{ ...props, rows: textArea.r, cols: textArea.c }} />
         )) || <input {...props} type={(isPassword && "password") || "text"} />}
         {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </>
   );
}
