import {createSelector} from "reselect";


const registrationStore = store=>store.registrationReducer;

export const selectUserPermissions = createSelector([registrationStore],registrationStore=>registrationStore.userPermissions);
export const userInfo = createSelector([registrationStore],registrationStore=>registrationStore.userInfo);
export const selectToken = createSelector([registrationStore],registrationStore=>registrationStore.token);


