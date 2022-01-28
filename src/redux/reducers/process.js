const initState ={
    demo: false,
    verifyStep: 0,
    showVerification: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "DEMO" : 
        return{
            ...state, 
            demo: action.payload,
        }
        case "VERIFY_STEP" : 
        return{
            ...state, 
            verifyStep: action.payload,
        }
        case "SHOW_VERIFICATION" : 
        return{
            ...state, 
            showVerification: action.payload,
        }
        default :
        return state
    }
}

export default reducer;