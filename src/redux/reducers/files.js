import { FILE, META_JSON, ORIGINAL_CONTRACT } from "redux/types"

const initState ={
    file: null,
    originalContract: false,
    metaJson: null,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FILE : 
        return{
            ...state, 
            file: action.payload,
        }
        case ORIGINAL_CONTRACT : 
        return{
            ...state, 
            originalContract: action.payload,
        }
        case META_JSON : 
        return{
            ...state, 
            metaJson: action.payload,
        }
        default :
        return state
    }
}

export default reducer;