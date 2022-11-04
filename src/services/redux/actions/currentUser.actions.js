import { ReduxActions } from "../../../utils/constants"; 

export const updateCurrentUserInstance = (userInstance) => ({
    type: ReduxActions.UPDATE_CURRENT_USER_INSTANCE, 
    payload: userInstance
});

export const updateCurrentUserReferences = (userRefs) => ({
    type: ReduxActions.UPDATE_CURRENT_USER_ADVANCE_REFS, 
    payload: userRefs
})