export const isInt = (value: any) => Number(value) === value && value % 1 === 0; 
export const isDecimal = (value: any) => Number(value) === value && value % 1 !== 0; 
export const fixDecimal = (value: any, fixTo: any) => Number(value).toFixed(fixTo);