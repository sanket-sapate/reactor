let initialData = {
    department:null,
    topics:{},
    topic:null,
    user:null
}

const reducer = (state = initialData,action) => {
    switch (action.type) {
        case "ADD-DEPARTMENT":
            return {
                ...state,
                department : action.payload
            }
        case "ADD-TOPICS":
            return {
                ...state,
                topics : {
                    [action.department] : action.payload
                }
            }
        case "ADD-TOPIC":
            return {
                ...state,
                topic : action.payload
            }
        case 'CHANGE-USER':
            return{
                ...state,
                user : action.payload
            }    
        default:
            return state
    }
}

export default reducer