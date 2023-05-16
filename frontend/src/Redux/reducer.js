let initialData = {
    department:null
}

const reducer = (state = initialData,action) => {
    if(action.type ==="ADD-DEPARTMENT"){
        state.department = action.payload
    }
    console.log(state)
    return state
}

export default reducer