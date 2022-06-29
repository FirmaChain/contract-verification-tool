import { HANDLE_MODAL_RESET, HANDLE_MODAL_DATA, HANDLE_MODAL_WALLET, HANDLE_MODAL_QUEUETX } from '../types';

const initialState = {
  data: {},
  wallet: false,
  queueTx: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_MODAL_RESET:
      return {
        ...state,
      };
    case HANDLE_MODAL_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case HANDLE_MODAL_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    case HANDLE_MODAL_QUEUETX:
      return {
        ...state,
        queueTx: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
