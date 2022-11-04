import { ReduxActions } from "../../../../utils/constants"

export const initialState = {
   userLoggedIn: null, 
   referencesAdvance: null
}; 

const currentUserReducer = (state, action) => {
   switch (action.type) {
      case ReduxActions.UPDATE_CURRENT_USER_INSTANCE: {
         return {
            ...state, 
            userLoggedIn: action.payload
         }
      }
      case ReduxActions.UPDATE_CURRENT_USER_ADVANCE_REFS: {
         return {
            ...state, 
            referencesAdvance: action.payload
         }
      }
   }
}

export default currentUserReducer; 