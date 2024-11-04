import { useState, useEffect } from "react";
import { TextFieldMetadata } from "../types";

export default function useInputsValidation(
   fields: TextFieldMetadata[],
   cb: (...args: any[]) => void | Promise<void>
): {
   errors: { [key: string]: string } | null;
   handleAfterValidate: () => void;
} {
   const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

   useEffect(() => {
      if (errors) setErrors(null);
   }, [...fields.map((field: TextFieldMetadata) => field.value)]);

   const handleAfterValidate = () => {
      const errs = getErrors();
      if (errs) {
         setErrors(errs);
         return;
      }
      cb();
   };

   const getErrors = () => {
      const userFieldInputs = fields.map((field: TextFieldMetadata) => ({
         ...field,
         value: field.value?.trim()
      }));

      const fieldInputsErrors = userFieldInputs.map(
         (field: TextFieldMetadata) => {
            const { title, value, pattern, errorIdentifier, errorMessage } =
               field;
            const isValid = value?.match(pattern);
            const fieldError =
               (!value?.length && `Vui lòng thêm ${title}`) ||
               (!isValid && errorMessage);
            return (
               (!!fieldError && {
                  fieldError,
                  errorIdentifier
               }) ||
               null
            );
         }
      );

      if (
         !fieldInputsErrors.every(
            (e: { fieldError: string; errorIdentifier: string } | null) => !e
         )
      ) {
         return {
            ...fieldInputsErrors.reduce(
               (
                  acc: { [key: string]: string },
                  cur: { fieldError: string; errorIdentifier: string } | null
               ) => {
                  if (!cur) return acc;
                  const { fieldError, errorIdentifier } = cur;
                  return { ...acc, [errorIdentifier]: fieldError };
               },
               {}
            )
         };
      }
      return null;
   };

   return {
      errors,
      handleAfterValidate
   };
}
