import React from "react";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";


const store = createStore(reducers, compose(applyMiddleware(thunk)));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId="401905550825-3evij7gugc3cne4hg23p8s4lub8h6d3c.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
