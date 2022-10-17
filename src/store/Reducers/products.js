import { ReduxActions } from "../../utils/constants"

export const initialState = {
   products: [], 
   filters: []
}

const productsReducer = (state, action) => {
   switch (action.type) {
      case ReduxActions.SET_PRODUCTS:
         return {
            ...state, 
            products: [...state.products, ...action.payload]
         }
      default: 
         throw new Error('Invalid action')
   }
}

export default productsReducer