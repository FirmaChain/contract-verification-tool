import { DEMO, SHOW_VERIFICATION, VERIFY_STEP } from "redux/types"

const initState ={
    demo: {
        status: false,
        privateKey: '',
    },
    verifyStep: 0,
    showVerification: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case DEMO : 
        return{
            ...state, 
            demo: action.payload,
        }
        case VERIFY_STEP : 
        return{
            ...state, 
            verifyStep: action.payload,
        }
        case SHOW_VERIFICATION : 
        return{
            ...state, 
            showVerification: action.payload,
        }
        default :
        return state
    }
}

export default reducer;