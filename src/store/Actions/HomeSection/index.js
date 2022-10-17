import { ReduxActions } from '../../../utils/constants'

export const setSectionData = sectionData => ({
   type: ReduxActions.SET_SECTION_DATA, 
   payload: sectionData
})

