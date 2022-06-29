import { bindActionCreators } from "redux";
import store from './store';
// import actions
import * as files from "./actions/files";
import * as process from "./actions/process";
import * as modal from "./actions/modal";
import * as wallet from "./actions/wallet";
const {dispatch} = store;

// export actions
export const FilesActions = bindActionCreators(files, dispatch);
export const ProcessActions = bindActionCreators(process, dispatch);
export const ModalActions = bindActionCreators(modal, dispatch);
export const WalletActions = bindActionCreators(wallet, dispatch);