import { DEMO, SHOW_VERIFICATION, VERIFY_STEP } from "redux/types"

export const setDemo = (demo) => {
    return (dispatch) => {
        dispatch({
            type: DEMO,
            payload: demo
        })
    }
}

export const setVerifyStep = (step) => {
    return (dispatch) => {
        dispatch({
            type: VERIFY_STEP,
            payload: step
        })
    }
}

export const showVerification = (show) => {
    return (dispatch) => {
        dispatch({
            type: SHOW_VERIFICATION,
            payload: show
        })
    }
}
