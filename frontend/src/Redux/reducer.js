let initialData = {

}

const reducer = (state = initialData,action) => {
    if(action.type ==="ADD-Data"){
        state = action.payload
    }
    return state
}

export default reducer