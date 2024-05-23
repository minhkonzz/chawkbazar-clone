export const isInt = (value: any) => Number(value) === value && value % 1 === 0; 
export const isDecimal = (value: any) => Number(value) === value && value % 1 !== 0; 

export const fixDecimal = (value: any, fixTo: any) => {
  return Number(value).toFixed(fixTo);
}

export const isProductInFiltered = (product: any, filter: any) => {
  const keyChecks = Object.keys(filter).map((key) => {
    const filterKeySelects = filter[key];
    for (let i = 0; i < filterKeySelects.length; i++) {
      if (filterKeySelects[i].optionId === product[key].id) return true;
    }
    return false; 
  }); 
  return !keyChecks.includes(false); 
}

export const mergeStyles = (styles: any, classNames: string[] = []) => {
  return classNames.map(className => styles[className]).join(" ");
}