import isAnyEmptyField from './checkAllObjectFields';

 const submitSignUpData = (signUpState)=>{

     
    if(signUpState.rights !== "Visitor"){
        const checkAllKeys = signUpAsACarRentalCompany(signUpState);
        return !checkAllKeys ? "Please wait we are creating your account as a car rental company"
                    : checkAllKeys;

      
    }else if(signUpState.rights === "Visitor"){
        const checkNecessaryKeys =   signUpAsAVistor(signUpState);
        return !checkNecessaryKeys ? "Please wait we are creating your account as a visitor"
                     : checkNecessaryKeys;
      
    }else{
       return "Please select a something in the first field"
    }
 };
 

 const signUpAsACarRentalCompany = (signUpState)=>{
        return checkFields(signUpState,"showProgressBar")
}

const checkFields = (state,endLimit)=>{
   const result = isAnyEmptyField(state,endLimit) ; 
    return result ? result+" field is mendatory": "";
}

const signUpAsAVistor = (signUpState)=>{
    return checkFields(signUpState,"country");
}


 export default submitSignUpData;