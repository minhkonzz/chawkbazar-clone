export const isInt = (value) => {
    return Number(value) === value && value % 1 === 0; 
}

export const isProductInFiltered = (product, filter) => {
    const keyChecks = Object.keys(filter).map((key) => filter[key].includes(product[key].id)); 
    return !keyChecks.includes(false); 
}