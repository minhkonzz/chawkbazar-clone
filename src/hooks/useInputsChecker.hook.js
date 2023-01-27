import { useState, useEffect } from "react";

export function useInputsValidation(fields, cb) {

  const [ errors, setErrors ] = useState(null); 

  useEffect(() => {
    if (errors) setErrors(null);
  }, [...fields.map((field) => field.inputValue)]);
  
  const handleAfterValidate = () => {
    const errs = getErrors();
    if (errs) {
      setErrors(errs);
      return; 
    }
    cb();
  }

  const getErrors = () => {
    const userFieldInputs = fields.map((field) => {
      return {
        ...field,
        inputValue: field.inputValue.trim()
      }
    });
    const fieldInputsErrors = userFieldInputs.map((field) => {
      const { fieldTitle, inputValue, pattern, errorIdentifier, errorMessage } = field;
      const isValid = inputValue.match(pattern);
      const fieldError = (inputValue.length === 0 && `Vui lòng thêm ${fieldTitle}`) || (!isValid && errorMessage)
      return !!fieldError && {
        fieldError, 
        errorIdentifier
      } || null;
    })

    if (!fieldInputsErrors.every((fieldError) => !fieldError)) {
      return {
        ...fieldInputsErrors.reduce((acc, cur) => {
          if (cur !== null) {
            const { fieldError, errorIdentifier } = cur;
            return {
              ...acc, 
              [errorIdentifier]: fieldError
            };
          }
          return acc;
        }, {})
      }
    }
    return null;
  }

  return {
    errors, 
    handleAfterValidate
  };
}