import { ReduxActions } from "../../utils/constants"

export const initialState = {
   sectionData: []
}

const HomeSectionReducer = (state, action) => {
   switch (action.type) {
      case ReduxActions.SET_SECTION_DATA: 
         return {
            ...state,
            sectionData: action.payload
         }
      default:
         throw new Error('Invalid action')
   }
}

export default HomeSectionReducer