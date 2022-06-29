import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import persistStore from "redux-persist/es/persistStore";
import store from "redux/store";
import PagesRoutes from "pages/pagesRoutes";

function App() {
  const persistor = persistStore(store);
  return (
    <SnackbarProvider maxSnack={3}>
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
