import { applyMiddleware, createStore } from "redux";
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['wallet'],
  };

  export default createStore(persistReducer(persistConfig, reducers), composeWithDevTools(applyMiddleware(thunk)));
