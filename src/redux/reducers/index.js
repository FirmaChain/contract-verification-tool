import { combineReducers } from "redux";
import Files from './files';
import Process from './process';

const reducers = combineReducers({
    files: Files,
    process: Process,
});

export default (state, action) => {
    return reducers(state, action)
}