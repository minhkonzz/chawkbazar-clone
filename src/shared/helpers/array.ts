export const isEmptyArray = (arr: any[]) => Array.isArray(arr) && arr.length === 0;
export const is2DArray = (arr: any[]) => !isEmptyArray(arr) && arr.every((e: any) => Array.isArray(e));