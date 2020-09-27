import {USERS_TYPE} from "./users.type";


const initialState = {
    users:[],
    pageno:0,
};

const userReducers = (state=initialState,actions)=>{
    switch (actions.type) {
        case USERS_TYPE.ADD_USERS:


            return{
                ...state,
                users:[...state.users,...actions.payload],
                pageno: state.pageno+=1,
            }
        case USERS_TYPE.REMOVE_USERS:
            return {
                users: [],
                pageno: 0,
            }
        case USERS_TYPE.DELETE_USER:
           console.log(state.users.filter(user=>(user._id !== actions.userId)))

            return{
                ...state,
                users:state.users.filter(user=>(user._id !== actions.userId))
            }
        default:
            return state;
    }
}

export default userReducers;