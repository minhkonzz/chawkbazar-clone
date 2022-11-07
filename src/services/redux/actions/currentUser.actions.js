import { ReduxActions } from "../../../utils/constants"; 

export const updateCurrentUser = (currentUser) => ({
    type: ReduxActions.UPDATE_CURRENT_USER, 
    payload: currentUser
});