import { ReduxActions } from "../../../../utils/constants"
import { isProductInFiltered } from "../../../../functions"

export const initialState = {
   allProducts: [], 
   currProducts: [], 
   filter: {}
}

const productsReducer = (state, action) => {
   switch (action.type) {
      case ReduxActions.APPEND_PRODUCTS:
         return {
            ...state, 
            allProducts: [ ...state.allProducts, ...action.payload ],
            currProducts: [ ...state.allProducts, ...action.payload ]
         }
      case ReduxActions.ADD_FILTER: {
         const { title, option } = action.payload; 
         const newFilter = { ...state.filter }; 
         newFilter[title] = newFilter[title] ? [ ...newFilter[title], option ] : [option]; 
         return {
            ...state, 
            filter: newFilter, 
            currProducts: state.allProducts.filter((product) => isProductInFiltered(product, newFilter))
         }; 
      }
      case ReduxActions.REMOVE_FILTER: {
         const { title, option } = action.payload; 
         const newFilter = { ...state.filter }; 
         if (newFilter[title].length === 1) delete newFilter[title]; 
         else newFilter[title] = newFilter[title].filter((selectedOpt) => selectedOpt !== option); 
         return {
            ...state, 
            filter: newFilter, 
            currProducts: state.allProducts.filter((product) => isProductInFiltered(product, newFilter))
         }; 
      }
      default: 
         throw new Error('Invalid action'); 
   }
}

export default productsReducer