import { ReduxActions } from "../../../../utils/constants"

export const setProducts = (products) => ({
   type: ReduxActions.APPEND_PRODUCTS,
   payload: products
})

export const addFilter = (filter) => ({
   type: ReduxActions.ADD_FILTER, 
   payload: filter
})

export const removeFilter = (filter) => ({
   type: ReduxActions.REMOVE_FILTER, 
   payload: filter
})