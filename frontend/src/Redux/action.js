export const action = (dispatch,getState)=>{
    if(!Object.keys(getState()).length){
        fetch('https://vnit-scholar.onrender.com/departments')
        .then((e)=>e.json())
        .then((payload)=>{
            dispatch({
                type:"ADD-Data",
                payload
            })
        })
    }
}