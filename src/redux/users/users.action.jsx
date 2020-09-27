
import axios from "axios";
import {allUsers,allUsersByPage} from "../../assets/serverUrls";
import {USERS_TYPE} from "./users.type";


const addUsers = (payload)=>({
    type:USERS_TYPE.ADD_USERS,
    payload
})


export const fetchAndAddUsers = ()=>{
      return dispatch=>{
          axios.get(allUsers).then(data=>{

           dispatch(addUsers(data.data));


          }).catch(err=>{
              console.log("err response 1");
              console.log(err);
          });
      }
}
export const fetchAndAddUsersNextPage = (pageno=0)=>{
    return dispatch=>{
        axios.get(allUsersByPage+pageno).then(data=>{

            dispatch(addUsers(data.data));

        }).catch(err=>{
            console.log("err response 2");
            console.log(err)
        });
    }
}

export const removeUsers = ()=>({
    type:USERS_TYPE.REMOVE_USERS
})

export const deleteUserAction = (userId)=>({
    type:USERS_TYPE.DELETE_USER,
    userId
});

