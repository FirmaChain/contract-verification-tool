import React, { useEffect } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { setChainConfig } from "utils/firma";
import { SnackbarProvider } from "notistack";
import { TEST_NET } from "redux/types";
import persistStore from "redux-persist/es/persistStore";
import store from "redux/store";
import PagesRoutes from "pages/pagesRoutes";
import './styles/font.css';

function App() {
  const persistor = persistStore(store);

  useEffect(() => {
    let network = TEST_NET;
    setChainConfig(network);
  }, [])

  return (
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Router>
          <Provider store={store} >
            <PersistGate persistor={persistor}>
              <PagesRoutes />
            </PersistGate>
          </Provider>
        </Router>
      </SnackbarProvider>
  );
}

export default App;
