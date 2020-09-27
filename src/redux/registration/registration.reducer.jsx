import {REGISTRATION_TYPES} from "./registration.types";
import {persistConfigToken} from "../../config/reduxPersistConfig";
import { persistReducer } from 'redux-persist';
import {firebaseAuth} from "../../config/firebase.config";

const initialState = {
    userPermissions:{read:false, write:false, delete:false, edit:false, login:false,rights:""},
    userInfo:{full_name:"",email:"",contact_no:"",id:"",dealershipId:"",car_rental_company_name:""},
    token:"",
};

const reducer = (state=initialState,actions)=>{

    // we manage our new token not rely on firebase token

       switch(actions.type){
           case REGISTRATION_TYPES.LOGIN:

               return {
                   ...state,
                  token:actions.payload.token,
                   userPermissions: {
                       read:actions.payload.user.userData.read
                       ,write:actions.payload.user.userData.write
                       ,edit:actions.payload.user.userData.edit
                       ,delete:actions.payload.user.userData.delete
                       ,login:true
                       ,rights:actions.payload.user.userData.rights
                       ,dealershipId: actions.payload.user.dealer_id,


                   },
                   userInfo: {
                       full_name:actions.payload.user.userData.full_name
                       ,email:actions.payload.user.userData.email,
                       contact_no:actions.payload.user.userData.contact_no,
                       car_rental_company_name: actions.payload.user.userData.car_rental_company_name ,
                       id:actions.payload.user.userData._id.toString()
                  }
               }

           case REGISTRATION_TYPES.LOGOUT:
               firebaseAuth.signOut().catch(err=>{
                  console.log("firebase auth error "+err);
               });

                return{
                    ...initialState,
                    token:""
                };

           default:
               return state;
       }
};

const localConfig = {
    ...persistConfigToken,
    whitelist:['token','userPermissions','userInfo']
}

export default persistReducer(localConfig, reducer);