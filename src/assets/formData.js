const formData = (values,endlimit)=>{
    const formData = new FormData();
    for(let keys in values){
        if(endlimit !== undefined && values === endlimit)
             break;
        formData.append(keys,values[keys]);
    }
    return formData;
}

export default formData;