export const isInt = (value) => Number(value) === value && value % 1 === 0; 
export const isDecimal = (value) => Number(value) === value && value % 1 !== 0; 

export const fixDecimal = (value, fixTo) => {
  return isInt(value) ? value : Number(value.toFixed(fixTo));
}

export const isProductInFiltered = (product, filter) => {
  const keyChecks = Object.keys(filter).map((key) => {
    const filterKeySelects = filter[key];
    for (let i = 0; i < filterKeySelects.length; i++) {
      if (filterKeySelects[i].optionId === product[key].id) return true;
    }
    return false; 
  }); 
  return !keyChecks.includes(false); 
}