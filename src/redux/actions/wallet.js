import { HANDLE_WALLET_ADDRESS, HANDLE_WALLET_PRIVATEKEY } from "redux/types"

export const handleWalletPrivateKey = (privateKey) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_WALLET_PRIVATEKEY,
            payload: privateKey,
        })
    }
}

export const handleWalletAddress = (address) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_WALLET_ADDRESS,
            payload: address,
        })
    }
}
