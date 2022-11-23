import { HANDLE_MODAL_RESET, 
    HANDLE_MODAL_DATA, 
    HANDLE_MODAL_WALLET, 
    HANDLE_MODAL_QUEUETX, 
    HANDLE_MODAL_WALLET_CONNECT,
    HANDLE_LOADING_PROGRESS, 
    HANDLE_MODAL_EDIT_HASHKEY } from '../types';
  
export const handleModalReset = () => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_RESET,
        })
    }
}

export const handleLoadingProgress = (loading) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_LOADING_PROGRESS,
            payload: loading,
        })
    }
}

export const handleModalData = (data) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_DATA,
            payload: data,
        })
    }
}

export const handleModalWalletConnect = (isVisible) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_WALLET_CONNECT,
            payload: isVisible,
        })
    }
}

export const handleModalWallet = (state) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_WALLET,
            payload: state,
        })
    }
}

export const handleModalQueueTx = (isVisible) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_QUEUETX,
            payload: isVisible,
        })
    }
}

export const handleModalEditHashKey = (isVisible) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_EDIT_HASHKEY,
            payload: isVisible,
        })
    }
}