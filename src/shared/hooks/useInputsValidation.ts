import { useState, useEffect } from "react";

export default function useInputsValidation(
   fields: any, 
   cb: any
): { 
   errors: any, 
   handleAfterValidate: () => void 
} {
   
   const [ errors, setErrors ] = useState(null); 

   useEffect(() => {
      if (errors) setErrors(null);
   }, [...fields.map((field: any) => field.inputValue)]);
  
   const handleAfterValidate = () => {
      const errs = getErrors();
      if (errs) {
         setErrors(errs);
         return; 
      }
      cb();
   }

   const getErrors = () => {
      const userFieldInputs = fields.map((field: any) => ({
         ...field,
         inputValue: field.inputValue.trim()
      }));

      const fieldInputsErrors = userFieldInputs.map((field: any) => {
        const { fieldTitle, inputValue, pattern, errorIdentifier, errorMessage } = field;
        const isValid = inputValue.match(pattern);
        const fieldError = (inputValue.length === 0 && `Vui lòng thêm ${fieldTitle}`) || (!isValid && errorMessage)
        return !!fieldError && {
            fieldError, 
            errorIdentifier
        } || null;
      });

      if (!fieldInputsErrors.every((fieldError: any) => !fieldError)) {
         return {
            ...fieldInputsErrors.reduce((acc: any, cur: any) => {
            if (cur !== null) {
               const { fieldError, errorIdentifier } = cur;
               return { ...acc, [errorIdentifier]: fieldError };
            }
            return acc;
            }, {})
         }
      }
      return null;
   }
   return { errors, handleAfterValidate };
}