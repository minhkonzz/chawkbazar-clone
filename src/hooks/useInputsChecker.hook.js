import { useState, useEffect } from "react";

export function useInputsValidation(fields, cb) {
  /*
    fields: fields need to be checked
     - fields: [
        {
          fieldTitle
          inputValue:
          pattern:
          errorIdentifier: 
          errorMessage: ""
        }
      ]
    cb: action or event need to do after validate fields success 
  */  
  const [ errors, setErrors ] = useState(null); 

  useEffect(() => {
    if (errors) setErrors(null);
  }, [...fields.map((field) => field.inputValue)]);
  
  const handleAfterValidate = () => {
    const errs = getErrors();
    console.log("errors:", errs);
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
        errorMessage, 
        errorIdentifier
      } || null;
    })

    if (!fieldInputsErrors.every((fieldError) => !fieldError)) {
      return {
        ...fieldInputsErrors.reduce((acc, cur) => {
          if (cur !== null) {
            const { errorMessage, errorIdentifier } = cur;
            return {
              ...acc, 
              [errorIdentifier]: errorMessage
            }
          }
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