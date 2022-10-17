import { ReduxActions } from "../../../utils/constants";

export const setProducts = (products) => ({
   type: ReduxActions.SET_PRODUCTS,
   payload: products
})