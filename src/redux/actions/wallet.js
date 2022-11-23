import { HANDLE_CHAIN_NETWORK, HANDLE_WALLET, HANDLE_WALLET_ADDRESS, HANDLE_WALLET_PRIVATEKEY } from "redux/types"

export const handleChainNetwork = (network) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_CHAIN_NETWORK,
            payload: network
        })
    }
}

export const handleWallet = (wallet) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_WALLET,
            payload: wallet
        })
    }
}

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
