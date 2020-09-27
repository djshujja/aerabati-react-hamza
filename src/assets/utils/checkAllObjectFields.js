const isAnyEmptyField = (object,endlimit)=>{
    for(let key in object){
        // endLimit is to limit how many keys require to check 
        if(endlimit !== undefined && key === endlimit)
            break;
       else if(object[key] === null || object[key] === ''){
          
            return key;
           
        }    

    }
    
    return "";
}

export default isAnyEmptyField;