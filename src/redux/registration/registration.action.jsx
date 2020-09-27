import {REGISTRATION_TYPES} from "./registration.types";

export const logoutAction = ()=>({
    type:REGISTRATION_TYPES.LOGOUT
});

export const loginAction = (payload)=>({
    type:REGISTRATION_TYPES.LOGIN,
    payload:payload
});

export const removeToken = ()=>({
    type:REGISTRATION_TYPES.REMOVE_TOKEN
})


