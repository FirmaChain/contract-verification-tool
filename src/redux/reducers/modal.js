import { HANDLE_MODAL_RESET, 
  HANDLE_MODAL_DATA, 
  HANDLE_MODAL_WALLET, 
  HANDLE_MODAL_QUEUETX, 
  HANDLE_MODAL_WALLET_CONNECT,
  NEW_WALLET, 
  HANDLE_LOADING_PROGRESS, 
  HANDLE_MODAL_EDIT_HASHKEY } from '../types';

const initialState = {
  loadingProgress: {
    loading: false,
    message: ''
  },
  data: {},
  connect: false,
  wallet: {
    isVisible: false,
    type: NEW_WALLET
  },
  queueTx: false,
  editHashKey: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_MODAL_RESET:
      return {
        ...state,
      };
    case HANDLE_LOADING_PROGRESS:
      return {
        ...state,
        loadingProgress: action.payload
      };
    case HANDLE_MODAL_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case HANDLE_MODAL_WALLET_CONNECT:
      return {
        ...state,
        connect: action.payload,
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
    case HANDLE_MODAL_EDIT_HASHKEY:
      return {
        ...state,
        editHashKey: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
