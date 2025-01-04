export const isInt = (value: number) =>
  Number(value) === value && value % 1 === 0;
export const isDecimal = (value: number) =>
  Number(value) === value && value % 1 !== 0;
export const fixDecimal = (value: number, fixTo: number) =>
  Number(value).toFixed(fixTo);
