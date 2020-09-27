import isAnyEmptyField from './checkAllObjectFields';


const loginUtil = (loginState,endValue)=>{

     const result =   isAnyEmptyField(loginState,endValue);
    return  result ? result+" is mendatory" :   "Please wait we are logging you in";
}

export default loginUtil;