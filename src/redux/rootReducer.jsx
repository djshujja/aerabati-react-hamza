import registrationReducer from "./registration/registration.reducer";
import {combineReducers} from "redux";
import userReducers from "./users/users.reducer";

const rootReducer = combineReducers({
    registrationReducer:registrationReducer,
    userReducers,
});


export default rootReducer;