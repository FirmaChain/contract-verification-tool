import React from "react";
import PagesRoutes from "pages/pagesRoutes";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";

function App() {
  return (
      <Router>
        <Provider store={store} >
          <PagesRoutes />
        </Provider>
      </Router>
  );
}

export default App;
