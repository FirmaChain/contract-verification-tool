const DEMO = "DEMO";
const VERIFY_STEP = 'VERIFY_STEP';
const SHOW_VERIFICATION = 'SHOW_VERIFICATION';

export const setDemo = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: DEMO,
            payload: boolean
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
