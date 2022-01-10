const initState ={
    file: null,
    originalContract: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "FILE" : 
        return{
            ...state, 
            file: action.payload,
        }
        case "ORIGINAL_CONTRACT" : 
        return{
            ...state, 
            originalContract: action.payload,
        }
        default :
        return state
    }
}

export default reducer;