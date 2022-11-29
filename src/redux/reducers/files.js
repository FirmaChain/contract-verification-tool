import { FILE, FILE_HASH, META_JSON, ORIGINAL_CONTRACT } from "redux/types"

const initState ={
    file: null,
    fileHash: '',
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
        case FILE_HASH : 
        return{
            ...state, 
            fileHash: action.payload,
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