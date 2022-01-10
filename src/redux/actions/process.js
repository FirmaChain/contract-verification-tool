const VERIFY_STEP = 'VERIFY_STEP';
const SHOW_VERIFICATION = 'SHOW_VERIFICATION';

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
