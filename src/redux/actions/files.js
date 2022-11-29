import { FILE, FILE_HASH, META_JSON, ORIGINAL_CONTRACT } from "redux/types"

export const setFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: FILE,
            payload: file
        })
    }
}

export const setFileHash = (hash) => {
    return (dispatch) => {
        dispatch({
            type: FILE_HASH,
            payload: hash
        })
    }
}

export const setOriginalContract = (result) => {
    return (dispatch) => {
        dispatch({
            type: ORIGINAL_CONTRACT,
            payload: result,
        })
    }
}

export const setMetaJson = (meta) => {
    return (dispatch) => {
        dispatch({
            type: META_JSON,
            payload: meta,
        })
    }
}