import { HANDLE_CHAIN_NETWORK, HANDLE_WALLET, HANDLE_WALLET_ADDRESS, HANDLE_WALLET_PRIVATEKEY } from "redux/types";

const initialState = {
  chainNetwork: '',
  wallet: {
    mnemonic: '',
    privateKey: '',
    address: '',
  },
  privateKey: '',
  address: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CHAIN_NETWORK:
      return {
        ...state,
        chainNetwork: action.payload,
      };
    case HANDLE_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
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
