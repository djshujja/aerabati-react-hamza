export const resizeWindow = (values,limit,cb)=>{
    window.addEventListener("resize",resize.bind(this));
    const newArray =  resize(values,limit,cb);
    cb(newArray);
}

export const resize = (values,limit,cb)=>{
    const newObject = {};
    if(window.innerWidth <= limit){
        for(let key in values){
            newObject[key] = values[key];
        }
    }

    return newObject;
}

