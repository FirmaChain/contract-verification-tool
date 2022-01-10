const FILE = 'FILE';
const ORIGINAL_CONTRACT = 'ORIGINAL_CONTRACT';

export const setFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: FILE,
            payload: file
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