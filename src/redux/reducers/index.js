import { combineReducers } from "redux";
import Files from './files';
import Process from './process';
import Modal from './modal';
import Wallet from './wallet';

const reducers = combineReducers({
    files: Files,
    process: Process,
    modal: Modal,
    wallet: Wallet,
});

export default (state, action) => {
    return reducers(state, action)
}