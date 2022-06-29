import { HANDLE_MODAL_RESET, HANDLE_MODAL_DATA, HANDLE_MODAL_WALLET, HANDLE_MODAL_QUEUETX } from '../types';

export const handleModalReset = () => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_RESET,
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

export const handleModalWallet = (isVisible) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_MODAL_WALLET,
            payload: isVisible,
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