import { ReduxActions } from "../../../../utils/constants";

export const initialState = {
   userLoggedIn: null, 
   referencesAdvance: null
}; 

const currentUserReducer = (state, action) => {
   switch (action.type) {
      case ReduxActions.UPDATE_CURRENT_USER: {
         if (action.payload) {
            const { currentUserInstance, currentUserRefs } = action.payload; 
            return {
               ...state, 
               userLoggedIn: currentUserInstance, 
               referencesAdvance: currentUserRefs
            } 
         }
         return {
            ...state, 
            userLoggedIn: null, 
            referencesAdvance: null
         }
      }
   }
}

export default currentUserReducer; 