import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { applyMiddleware, createStore } from "redux";

export default createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
