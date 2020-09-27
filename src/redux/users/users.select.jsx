import  {createSelector} from "reselect";

const userStore = store=>store.userReducers;
export const users = createSelector([userStore],userStore=>userStore.users);
export const pageno = createSelector([userStore],userStore=>userStore.pageno);
