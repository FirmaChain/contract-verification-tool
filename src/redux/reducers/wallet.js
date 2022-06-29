import { HANDLE_WALLET_ADDRESS, HANDLE_WALLET_PRIVATEKEY } from "redux/types";

const initialState = {
  privateKey: '',
  address: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_WALLET_PRIVATEKEY:
      return {
        ...state,
        privateKey: action.payload,
      };
    case HANDLE_WALLET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
