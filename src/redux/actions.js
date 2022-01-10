import { bindActionCreators } from "redux";
import store from './store';
// import actions
import * as files from "./actions/files";
import * as process from "./actions/process";
const {dispatch} = store;

// export actions
export const FilesActions = bindActionCreators(files, dispatch);
export const ProcessActions = bindActionCreators(process, dispatch);